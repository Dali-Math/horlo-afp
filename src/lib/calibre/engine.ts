/**
 * HorloLearn — Contrôleur moteur du calibre ETA 6497-1 (client-only).
 * Trackball quaternion sans blocage, gestes multi-pointeurs, synthétiseur
 * acoustique 5 Hz, cinématique d'échappement 5 phases et HUD anti-défilement.
 */
import * as THREE from 'three';
import { buildCalibreScene, AXIS_X, AXIS_Y, type CalibreSceneRefs } from './engine-scene';
import { ORGAN_DATABASE, type OrganId, type PresetId } from './data';

const AXIS_Z = new THREE.Vector3(0, 0, 1);
const ZOOM_MIN = 5.0;
const ZOOM_MAX = 45.0;

export type SensitivityMode = 'doux' | 'normal' | 'precis';

export interface EngineCallbacks {
  onOrgan: (id: OrganId) => void;
  onHud: (mode: 'frozen' | 'live', idx: number) => void;
  onBeatLabel: (text: string) => void;
  onScrub: (pct: number) => void;
  onSpeed: (mult: number) => void;
  onExplode: (pct: number) => void;
  onXray: (pct: number) => void;
  onMainspring: (pct: number) => void;
  onAudio: (on: boolean) => void;
  onAutoRotate: (on: boolean) => void;
  onHelp: () => void;
  onFullscreenKey: () => void;
  onPreset: (id: PresetId) => void;
}

interface SimState {
  speedMultiplier: number;
  beatPhasePct: number;
  beatDirection: number;
  totalEscapeTeethPassed: number;
  explodeFactor: number;
  xrayFactor: number;
  mainspringCharge: number;
  audioEnabled: boolean;
  isDialSideShown: boolean;
  autoRotate: boolean;
  rotSensitivity: number;
}

export interface CalibreEngineHandle {
  dispose: () => void;
  setSpeed: (spd: number) => void;
  scrubBeat: (pct: number) => void;
  setExplode: (pct: number) => void;
  setXray: (pct: number) => void;
  setMainspring: (pct: number) => void;
  windStep: () => void;
  toggleAudio: () => void;
  setAutoRotate: (on: boolean) => void;
  setSensitivity: (mode: SensitivityMode) => void;
  setPreset: (preset: PresetId) => void;
  focusOrgan: (organId: OrganId) => void;
  flip180: () => void;
  nudge: (deltaPitchX: number, deltaYawY: number) => void;
  screenshot: () => void;
  resize: () => void;
}

export function createCalibreEngine(container: HTMLDivElement, cb: EngineCallbacks): CalibreEngineHandle {
  const simState: SimState = {
    speedMultiplier: 1.0,
    beatPhasePct: 45,
    beatDirection: 1,
    totalEscapeTeethPassed: 0,
    explodeFactor: 0,
    xrayFactor: 0.25,
    mainspringCharge: 85,
    audioEnabled: false,
    isDialSideShown: false,
    autoRotate: true,
    rotSensitivity: 1.0,
  };

  // ——— 3D WEBGL ENGINE (SCENE ASSEMBLY) ———
  const refs: CalibreSceneRefs = buildCalibreScene(container, simState.xrayFactor);
  const { scene, camera, renderer, calibreWorld, calibrePivot, layerGroups, organMeshes, bridgeMaterials, xrayMeshes, meshes } = refs;

  // Quaternion Trackball State
  const trackball = {
    currentQuat: new THREE.Quaternion(),
    targetQuat: new THREE.Quaternion(),
    currentPivot: new THREE.Vector3(0, 0, 0),
    targetPivot: new THREE.Vector3(0, 0, 0),
    currentZoom: 23.0,
    targetZoom: 23.0,
    velX: 0,
    velY: 0,
  };

  const setTrackballEuler = (rx: number, ry: number, rz = 0) => {
    trackball.velX = 0;
    trackball.velY = 0;
    trackball.targetQuat.setFromEuler(new THREE.Euler(rx, ry, rz, 'XYZ'));
  };

  const nudgeTrackball = (deltaPitchX: number, deltaYawY: number) => {
    trackball.velX = 0;
    trackball.velY = 0;
    const qx = new THREE.Quaternion().setFromAxisAngle(AXIS_X, deltaPitchX);
    const qy = new THREE.Quaternion().setFromAxisAngle(AXIS_Y, deltaYawY);
    trackball.targetQuat.premultiply(qy).premultiply(qx).normalize();
  };

  const flipCalibre180 = () => {
    const qFlip = new THREE.Quaternion().setFromAxisAngle(AXIS_X, Math.PI);
    trackball.targetQuat.premultiply(qFlip).normalize();
    simState.isDialSideShown = !simState.isDialSideShown;
  };

  // Default Isometric 3D Tilt on Movement Bridges
  setTrackballEuler(0.88, -0.38, 0);
  trackball.currentQuat.copy(trackball.targetQuat);
  calibreWorld.quaternion.copy(trackball.currentQuat);

  // ——— WEB AUDIO API MECHANICAL TICK-TOCK SYNTHESIZER (5 Hz = 18'000 A/h) ———
  let audioCtx: AudioContext | null = null;

  const playMechanicalAcousticImpulse = (type: 'chute' | 'lock') => {
    if (!simState.audioEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type === 'chute' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(type === 'chute' ? 3900 : 2800, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.012);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.015);
    } catch {
      /* audio non critique */
    }
  };

  // ——— EFFORTLESS 360° MANIPULATION : MULTI-POINTER GESTURES + INERTIA ———
  const gesture = {
    pointers: new Map<number, { x: number; y: number }>(),
    mode: 'none' as 'none' | 'rotate' | 'pan' | 'multi',
    startDist: 0,
    startAngle: 0,
    startMidX: 0,
    startMidY: 0,
    startZoom: 21.0,
    downTime: 0,
    downX: 0,
    downY: 0,
    moved: false,
  };

  const clampZoom = (z: number) => THREE.MathUtils.clamp(z, ZOOM_MIN, ZOOM_MAX);

  const applyDragRotation = (dx: number, dy: number) => {
    const zf = THREE.MathUtils.clamp(trackball.currentZoom / 21, 0.42, 1.15);
    const rotSpeed = 0.0078 * (simState.rotSensitivity || 1.0) * zf;
    const qYaw = new THREE.Quaternion().setFromAxisAngle(AXIS_Y, dx * rotSpeed);
    const qPitch = new THREE.Quaternion().setFromAxisAngle(AXIS_X, dy * rotSpeed);
    trackball.targetQuat.premultiply(qYaw).premultiply(qPitch).normalize();
    trackball.velX = dx * rotSpeed * 0.42;
    trackball.velY = dy * rotSpeed * 0.42;
  };

  const panByScreenDelta = (dx: number, dy: number) => {
    const panSpeed = trackball.currentZoom * 0.0012;
    trackball.targetPivot.x += dx * panSpeed;
    trackball.targetPivot.y -= dy * panSpeed;
  };

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  const pickOrganAt = (clientX: number, clientY: number) => {
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const clickableRoots = Object.values(organMeshes);
    const intersects = raycaster.intersectObjects(clickableRoots, true);
    if (intersects.length > 0) {
      let obj: THREE.Object3D | null = intersects[0].object;
      while (obj && !obj.userData.organId && obj.parent) obj = obj.parent;
      if (obj && obj.userData.organId) cb.onOrgan(obj.userData.organId as OrganId);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button === 1) e.preventDefault();
    gesture.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gesture.pointers.size === 1) {
      gesture.mode = e.button === 2 || e.button === 1 || e.shiftKey ? 'pan' : 'rotate';
      gesture.downTime = performance.now();
      gesture.downX = e.clientX;
      gesture.downY = e.clientY;
      gesture.moved = false;
      trackball.velX = 0;
      trackball.velY = 0;
    } else if (gesture.pointers.size === 2) {
      gesture.mode = 'multi';
      const pts = [...gesture.pointers.values()];
      gesture.startDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      gesture.startAngle = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x);
      gesture.startMidX = (pts[0].x + pts[1].x) / 2;
      gesture.startMidY = (pts[0].y + pts[1].y) / 2;
      gesture.startZoom = trackball.targetZoom;
      gesture.moved = true;
      trackball.velX = 0;
      trackball.velY = 0;
    }
    renderer.domElement.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: PointerEvent) => {
    const rec = gesture.pointers.get(e.pointerId);
    if (!rec) return;
    const prevX = rec.x;
    const prevY = rec.y;
    rec.x = e.clientX;
    rec.y = e.clientY;

    if (gesture.pointers.size === 1) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      if (Math.hypot(e.clientX - gesture.downX, e.clientY - gesture.downY) > 5) gesture.moved = true;
      if (gesture.mode === 'pan') {
        panByScreenDelta(dx, dy);
      } else {
        applyDragRotation(dx, dy);
      }
    } else if (gesture.pointers.size === 2 && gesture.mode === 'multi') {
      const pts = [...gesture.pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ang = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x);
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;

      // Pinch zoom (exponential dolly feel)
      if (gesture.startDist > 4 && dist > 4) {
        const factor = gesture.startDist / dist;
        trackball.targetZoom = clampZoom(gesture.startZoom * factor);
      }

      // Two-finger twist : roll the movement around the view axis (360° écran)
      let dAng = ang - gesture.startAngle;
      while (dAng > Math.PI) dAng -= Math.PI * 2;
      while (dAng < -Math.PI) dAng += Math.PI * 2;
      if (Math.abs(dAng) > 0.004) {
        const qz = new THREE.Quaternion().setFromAxisAngle(AXIS_Z, dAng);
        trackball.targetQuat.premultiply(qz).normalize();
        gesture.startAngle = ang;
      }

      // Two-finger pan
      panByScreenDelta(midX - gesture.startMidX, midY - gesture.startMidY);
      gesture.startMidX = midX;
      gesture.startMidY = midY;
    }
  };

  const endPointer = (e: PointerEvent) => {
    if (!gesture.pointers.has(e.pointerId)) return;
    gesture.pointers.delete(e.pointerId);
    if (gesture.pointers.size === 0) {
      renderer.domElement.style.cursor = 'grab';
      if (gesture.mode === 'rotate' && !gesture.moved && performance.now() - gesture.downTime < 300) {
        pickOrganAt(e.clientX, e.clientY);
      }
      gesture.mode = 'none';
    } else if (gesture.pointers.size === 1) {
      gesture.mode = 'rotate';
      gesture.moved = true; // suppress accidental tap-select after a pinch
    }
  };

  const onDblClick = () => {
    trackball.targetPivot.set(0, 0, 0);
    trackball.targetZoom = 23.0;
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const factor = Math.exp(e.deltaY * 0.0011);
    trackball.targetZoom = clampZoom(trackball.targetZoom * factor);
  };

  const onContextMenu = (e: MouseEvent) => e.preventDefault();

  const onKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
    const k = e.key.toLowerCase();
    if (e.key === 'ArrowLeft') nudgeTrackball(0, -0.14);
    else if (e.key === 'ArrowRight') nudgeTrackball(0, 0.14);
    else if (e.key === 'ArrowUp') nudgeTrackball(-0.14, 0);
    else if (e.key === 'ArrowDown') nudgeTrackball(0.14, 0);
    else if (e.key === '+' || e.key === '=') trackball.targetZoom = clampZoom(trackball.targetZoom * 0.88);
    else if (e.key === '-') trackball.targetZoom = clampZoom(trackball.targetZoom * 1.14);
    else if (k === 'r') {
      simState.autoRotate = !simState.autoRotate;
      cb.onAutoRotate(simState.autoRotate);
    } else if (k === 'f') cb.onFullscreenKey();
    else if (k === 'p') screenshot();
    else if (k === 'b') flipCalibre180();
    else if (k === 'h') cb.onHelp();
  };

  const dom = renderer.domElement;
  dom.addEventListener('contextmenu', onContextMenu);
  dom.addEventListener('pointerdown', onPointerDown);
  dom.addEventListener('dblclick', onDblClick);
  dom.addEventListener('wheel', onWheel, { passive: false });
  dom.style.cursor = 'grab';
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', endPointer);
  window.addEventListener('pointercancel', endPointer);
  window.addEventListener('keydown', onKeyDown);

  const onViewportResize = () => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw && ch) {
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    }
  };
  window.addEventListener('resize', onViewportResize);
  const onFullscreenChange = () => setTimeout(onViewportResize, 80);
  document.addEventListener('fullscreenchange', onFullscreenChange);

  // ——— INITIAL SYNCS (mirror of window.onload bootstrap) ———
  refs.rebuildMainspringSpiral(simState.mainspringCharge);
  const initialWindRot = (simState.mainspringCharge / 100) * Math.PI * 8;
  if (meshes.windingCrown && meshes.crownWheel && meshes.ratchetWheel) {
    meshes.windingCrown.rotation.x = initialWindRot;
    meshes.crownWheel.rotation.y = -initialWindRot * 0.5;
    meshes.ratchetWheel.rotation.y = initialWindRot * 0.25;
  }
  updateXrayShadows();

  // ——— HUD ANTI-DÉFILEMENT (figé en vitesse animée, live en Micro-Pas/Manuel) ———
  let hudCache: string | null = null;
  let lastBeatLabel = '';
  let lastScrubEmitted = -1;

  const emitHud = () => {
    const p = simState.beatPhasePct / 100;
    const liveMode = !simState.speedMultiplier || simState.speedMultiplier <= 0.08;
    if (liveMode) {
      const idx = p < 0.22 ? 0 : p < 0.36 ? 1 : p < 0.68 ? 2 : p < 0.78 ? 3 : 4;
      const key = `live${idx}`;
      if (hudCache !== key) {
        hudCache = key;
        cb.onHud('live', idx);
      }
    } else if (hudCache !== 'frozen') {
      hudCache = 'frozen';
      cb.onHud('frozen', -1);
    }
  };

  const computeBeatLabel = () => {
    const ms = Math.round((simState.beatPhasePct / 100) * 200);
    if (simState.speedMultiplier === 0) {
      return `${simState.beatPhasePct.toFixed(0)}% (${ms} / 200 ms)`;
    }
    return `Cycle Actif (${simState.speedMultiplier}×) • ${ms} ms`;
  };

  const emitBeatLabel = () => {
    const label = computeBeatLabel();
    if (label !== lastBeatLabel) {
      lastBeatLabel = label;
      cb.onBeatLabel(label);
    }
  };

  function updateXrayShadows() {
    const shadowsOn = 1 - simState.xrayFactor > 0.4;
    xrayMeshes.forEach((m) => {
      m.castShadow = shadowsOn;
    });
  }

  emitBeatLabel();
  emitHud();

  // ——— ANIMATION LOOP ———
  let lastFrameTime = performance.now();
  let rafId = 0;
  let disposed = false;

  function animate(now: number) {
    if (disposed) return;
    rafId = requestAnimationFrame(animate);

    const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
    lastFrameTime = now;

    // 1. Inertia + Quaternion Slerp for silky 360° rotation
    if (gesture.pointers.size === 0 && (Math.abs(trackball.velX) > 0.0002 || Math.abs(trackball.velY) > 0.0002)) {
      const qYaw = new THREE.Quaternion().setFromAxisAngle(AXIS_Y, trackball.velX);
      const qPitch = new THREE.Quaternion().setFromAxisAngle(AXIS_X, trackball.velY);
      trackball.targetQuat.premultiply(qYaw).premultiply(qPitch).normalize();
      trackball.velX *= 0.94;
      trackball.velY *= 0.94;
    }

    // 1.b Turntable Auto-Rotation (pauses instantly while the user manipulates)
    if (simState.autoRotate && gesture.pointers.size === 0) {
      const qSpin = new THREE.Quaternion().setFromAxisAngle(AXIS_Y, dt * 0.3);
      trackball.targetQuat.premultiply(qSpin).normalize();
    }

    trackball.currentQuat.slerp(trackball.targetQuat, 0.17);
    calibreWorld.quaternion.copy(trackball.currentQuat);

    trackball.currentPivot.lerp(trackball.targetPivot, 0.14);
    calibrePivot.position.copy(trackball.currentPivot);

    trackball.currentZoom += (trackball.targetZoom - trackball.currentZoom) * 0.14;
    camera.position.set(0, 0, trackball.currentZoom);
    camera.lookAt(0, 0, 0);

    // 2. Smooth Vertical Layer Separation (Exploded View Z-Axis)
    layerGroups.forEach((grp, idx) => {
      const targetY = (idx - 1.5) * simState.explodeFactor * 1.65;
      grp.position.y += (targetY - grp.position.y) * 0.12;
    });

    // 3. Advance Beat Progress (1 beat = 200 ms at 18'000 A/h = 5 beats/sec)
    if (simState.speedMultiplier > 0) {
      const beatsPerSec = 5.0 * simState.speedMultiplier;
      simState.beatPhasePct += dt * beatsPerSec * 100;

      if (simState.beatPhasePct >= 100) {
        simState.beatPhasePct -= 100;
        simState.beatDirection *= -1;
        simState.totalEscapeTeethPassed += 0.5;
        playMechanicalAcousticImpulse('chute');
      }
      if (simState.speedMultiplier <= 0.15) {
        const rounded = Math.round(simState.beatPhasePct * 2) / 2;
        if (rounded !== lastScrubEmitted) {
          lastScrubEmitted = rounded;
          cb.onScrub(rounded);
        }
        emitBeatLabel();
      }
    }

    // 4. Compute Exact Swiss Lever Escapement Kinematics from beatPhasePct (0..100%)
    const p = simState.beatPhasePct / 100;
    const ampRad = ((185 + (simState.mainspringCharge / 100) * 125) * Math.PI) / 180;

    const balanceAngle = -Math.cos(p * Math.PI) * ampRad * simState.beatDirection;

    let forkNormalized = -1;
    if (p < 0.32) {
      forkNormalized = -1;
    } else if (p <= 0.68) {
      const tImp = (p - 0.32) / 0.36;
      forkNormalized = -1 + tImp * 2;
    } else {
      forkNormalized = 1;
    }
    const palletAngleRad = forkNormalized * 0.14 * simState.beatDirection;

    let toothStepProgress = 0;
    if (p > 0.34 && p <= 0.72) {
      toothStepProgress = (p - 0.34) / 0.38;
    } else if (p > 0.72) {
      toothStepProgress = 1.0;
    }
    const totalHalfSteps = simState.totalEscapeTeethPassed * 2 + toothStepProgress;
    const escapeWheelAngle = totalHalfSteps * ((Math.PI * 2) / 30);

    // 5. Apply Rotations to 3D Calibre Meshes
    if (meshes.balanceWheel && meshes.hairspring) {
      meshes.balanceWheel.rotation.y = balanceAngle;
      const breatheScale = 1.0 + Math.sin(balanceAngle) * 0.065;
      meshes.hairspring.scale.set(breatheScale, 1, breatheScale);
    }

    if (meshes.palletFork) {
      meshes.palletFork.rotation.y = palletAngleRad;
    }

    if (meshes.escapeWheel) {
      meshes.escapeWheel.rotation.y = -escapeWheelAngle;
    }
    if (meshes.fourthWheel) {
      meshes.fourthWheel.rotation.y = escapeWheelAngle / 10;
    }
    if (meshes.thirdWheel) {
      meshes.thirdWheel.rotation.y = -escapeWheelAngle / 75;
    }
    if (meshes.centerWheel) {
      meshes.centerWheel.rotation.y = escapeWheelAngle / 600;
    }
    if (meshes.barrel) {
      meshes.barrel.rotation.y = -escapeWheelAngle / 4200;
    }

    // Synchronized Hands on Dial Side
    if (meshes.hourHand) {
      meshes.hourHand.rotation.y = escapeWheelAngle / 7200;
    }
    if (meshes.minuteHand) {
      meshes.minuteHand.rotation.y = escapeWheelAngle / 600;
    }
    if (meshes.smallSecondsHand) {
      meshes.smallSecondsHand.rotation.y = escapeWheelAngle / 10;
    }

    emitHud();

    renderer.render(scene, camera);
  }
  rafId = requestAnimationFrame(animate);

  // ——— PUBLIC CONTROL API ———
  function setSpeed(spd: number) {
    simState.speedMultiplier = spd;
    cb.onSpeed(spd);
    emitBeatLabel();
  }

  function scrubBeat(pct: number) {
    setSpeed(0);
    simState.beatPhasePct = pct;
    emitBeatLabel();
  }

  function setExplode(pct: number) {
    simState.explodeFactor = pct / 100;
    cb.onExplode(pct);
  }

  function setXray(pct: number) {
    simState.xrayFactor = pct / 100;
    bridgeMaterials.forEach((m) => {
      m.opacity = Math.max(0.06, 1 - simState.xrayFactor);
    });
    updateXrayShadows();
    cb.onXray(pct);
  }

  function setMainspring(pct: number) {
    simState.mainspringCharge = pct;
    refs.rebuildMainspringSpiral(pct);

    if (meshes.windingCrown && meshes.crownWheel && meshes.ratchetWheel) {
      const windRot = (pct / 100) * Math.PI * 8;
      meshes.windingCrown.rotation.x = windRot;
      meshes.crownWheel.rotation.y = -windRot * 0.5;
      meshes.ratchetWheel.rotation.y = windRot * 0.25;
    }
    cb.onMainspring(pct);
  }

  function windStep() {
    const nextVal = Math.min(100, simState.mainspringCharge + 15);
    setMainspring(nextVal);
    playMechanicalAcousticImpulse('chute');
  }

  function toggleAudio() {
    simState.audioEnabled = !simState.audioEnabled;
    if (simState.audioEnabled && !audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    cb.onAudio(simState.audioEnabled);
  }

  function setAutoRotate(on: boolean) {
    simState.autoRotate = on;
    cb.onAutoRotate(on);
  }

  function setSensitivity(mode: SensitivityMode) {
    simState.rotSensitivity = mode === 'doux' ? 0.55 : mode === 'precis' ? 1.75 : 1.0;
  }

  function setPreset(preset: PresetId) {
    cb.onPreset(preset);
    if (preset === 'iso') {
      simState.isDialSideShown = false;
      setTrackballEuler(0.88, -0.38, 0);
      trackball.targetPivot.set(0, 0, 0);
      trackball.targetZoom = 23.0;
    } else if (preset === 'topBridges') {
      simState.isDialSideShown = false;
      setTrackballEuler(Math.PI / 2, 0, 0);
      trackball.targetPivot.set(0, 0, 0);
      trackball.targetZoom = 24.0;
    } else if (preset === 'dial') {
      simState.isDialSideShown = true;
      setTrackballEuler(-Math.PI / 2, 0, 0);
      trackball.targetPivot.set(0, 0.4, 0);
      trackball.targetZoom = 26.0;
      cb.onOrgan('dial');
    } else if (preset === 'escapement') {
      simState.isDialSideShown = false;
      setTrackballEuler(1.18, 0.15, 0);
      trackball.targetPivot.set(1.2, -0.4, -4.0);
      trackball.targetZoom = 7.8;
      if (simState.xrayFactor < 0.65) setXray(75);
      cb.onOrgan('palletFork');
    } else if (preset === 'balanceMacro') {
      simState.isDialSideShown = false;
      setTrackballEuler(1.05, -0.32, 0);
      trackball.targetPivot.set(-2.8, -0.6, -3.6);
      trackball.targetZoom = 9.5;
      cb.onOrgan('balance');
    } else if (preset === 'profile') {
      simState.isDialSideShown = false;
      setTrackballEuler(0.12, -0.65, 0);
      trackball.targetPivot.set(0, -0.3, 0);
      trackball.targetZoom = 23.0;
      if (simState.explodeFactor < 0.45) setExplode(65);
    }
  }

  function focusOrgan(organId: OrganId) {
    // Glisse vers l'organe en CONSERVANT l'orientation 360° choisie par l'utilisateur
    // (aucun "arrachage" de vue : seulement la cible et la distance sont animées)
    const data = ORGAN_DATABASE[organId];
    if (!data) return;
    trackball.targetPivot.set(data.focusOffset.x, data.focusOffset.y, data.focusOffset.z);
    trackball.targetZoom = data.zoomDist || 11.0;
  }

  function screenshot() {
    try {
      const prevBg = scene.background;
      scene.background = new THREE.Color(0x0b0e14);
      renderer.render(scene, camera);
      const url = renderer.domElement.toDataURL('image/png');
      scene.background = prevBg;
      const a = document.createElement('a');
      a.href = url;
      a.download = 'HorloLearn_ETA6497-1_' + new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-') + '.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      /* capture non critique */
    }
  }

  function dispose() {
    disposed = true;
    cancelAnimationFrame(rafId);
    dom.removeEventListener('contextmenu', onContextMenu);
    dom.removeEventListener('pointerdown', onPointerDown);
    dom.removeEventListener('dblclick', onDblClick);
    dom.removeEventListener('wheel', onWheel);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endPointer);
    window.removeEventListener('pointercancel', endPointer);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', onViewportResize);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    if (audioCtx && audioCtx.state !== 'closed') {
      try {
        audioCtx.close();
      } catch {
        /* ignore */
      }
      audioCtx = null;
    }
    refs.dispose();
  }

  return {
    dispose,
    setSpeed,
    scrubBeat,
    setExplode,
    setXray,
    setMainspring,
    windStep,
    toggleAudio,
    setAutoRotate,
    setSensitivity,
    setPreset,
    focusOrgan,
    flip180: flipCalibre180,
    nudge: nudgeTrackball,
    screenshot,
    resize: onViewportResize,
  };
}
