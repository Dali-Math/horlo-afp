/**
 * HorloLearn — Géométrie procédurale du calibre ETA 6497-1 (Three.js r128).
 * Portage 1:1 du moteur HTML d'origine : studio HDR (PMREM), finitions décoratives
 * (Côtes de Genève, perlage, satiné circulaire), engrenages épicycloïdaux à dents
 * club, rubis, vis bleuies, cadran soleillé et aiguilles facettées Dauphine.
 */
import * as THREE from 'three';

let maxAnisotropy = 8;

export function setMaxAnisotropy(v: number) {
  maxAnisotropy = v;
}

/**
 * 4.a PROCEDURAL STUDIO ENVIRONMENT (HDR Image-Based Lighting via PMREM)
 * A dark watchmaker's photo studio: gradient dome + bright softboxes so polished
 * steel, brass and rubies get real reflections while rotating in any direction.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const envScene = new THREE.Scene();

  // Gradient dome (dark atelier ceiling → near-black floor)
  const domeGeo = new THREE.SphereGeometry(60, 32, 24);
  const pos = domeGeo.attributes.position;
  const colors: number[] = [];
  const cTop = new THREE.Color(0x2e3b50);
  const cMid = new THREE.Color(0x131924);
  const cBot = new THREE.Color(0x04060a);
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 60;
    const c =
      y > 0
        ? cMid.clone().lerp(cTop, Math.min(1, y * 1.5))
        : cMid.clone().lerp(cBot, Math.min(1, -y * 1.7));
    colors.push(c.r, c.g, c.b);
  }
  domeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  envScene.add(new THREE.Mesh(domeGeo, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })));

  // Softboxes (HDR-bright panels that paint metallic reflections)
  const softbox = (w: number, h: number, hexColor: number, intensity: number, x: number, y2: number, z: number) => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(hexColor).multiplyScalar(intensity),
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.position.set(x, y2, z);
    mesh.lookAt(0, 0, 0);
    envScene.add(mesh);
  };
  softbox(26, 13, 0xfff4dc, 6.0, 6, 26, 10); // Key softbox : warm, top-right-front
  softbox(22, 6, 0xcfe6ff, 3.6, -26, 8, 12); // Cool strip light : left
  softbox(18, 5, 0xffe7bc, 3.2, 24, 3, -14); // Warm ribbon : right rear
  softbox(12, 5, 0xffffff, 2.4, 2, -20, 18); // Bottom fill : dial-side bounce
  softbox(34, 9, 0xb9d2ff, 2.2, -4, 6, -30); // Wide back rim

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(envScene, 0.04);
  pmrem.dispose();
  return envRT.texture;
}

/** Côtes de Genève diagonales (rayage en bandes sinusoïdales). */
export function createCotesDeGeneveTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = '#C3CEDC';
  ctx.fillRect(0, 0, 1024, 1024);

  const stripeW = 118;
  ctx.save();
  ctx.translate(512, 512);
  ctx.rotate(-0.42);
  ctx.translate(-512, -512);
  for (let x = -320; x < 1360; x += stripeW) {
    const g = ctx.createLinearGradient(x, 0, x + stripeW, 0);
    g.addColorStop(0.0, 'rgba(62, 78, 98, 0.50)');
    g.addColorStop(0.2, 'rgba(255, 255, 255, 0.78)');
    g.addColorStop(0.48, 'rgba(233, 241, 248, 0.30)');
    g.addColorStop(0.76, 'rgba(255, 255, 255, 0.60)');
    g.addColorStop(1.0, 'rgba(62, 78, 98, 0.50)');
    ctx.fillStyle = g;
    ctx.fillRect(x, -320, stripeW, 1680);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let f = 2; f < stripeW; f += 3) {
      ctx.beginPath();
      ctx.moveTo(x + f, -320);
      ctx.lineTo(x + f, 1360);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(38, 50, 64, 0.38)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x + stripeW, -320);
    ctx.lineTo(x + stripeW, 1360);
    ctx.stroke();
  }
  ctx.restore();

  const vg = ctx.createRadialGradient(512, 512, 260, 512, 512, 760);
  vg.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
  vg.addColorStop(1, 'rgba(18, 26, 38, 0.30)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, 1024, 1024);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.15, 1.15);
  if ('colorSpace' in tex) (tex as any).colorSpace = (THREE as any).SRGBColorSpace; else (tex as any).encoding = (THREE as any).sRGBEncoding;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/** Perlage circulaire de platine (grainage en rosaces). */
export function createPerlageTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = '#AEBAC8';
  ctx.fillRect(0, 0, 1024, 1024);

  const step = 62;
  for (let row = -1; row < 1024 / step + 2; row++) {
    for (let col = -1; col < 1024 / step + 2; col++) {
      const cx = col * step + (row % 2 ? step / 2 : 0);
      const cy = row * step;
      const r = step * 0.8;
      const g = ctx.createRadialGradient(cx - r * 0.32, cy - r * 0.32, r * 0.08, cx, cy, r);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      g.addColorStop(0.55, 'rgba(219, 229, 240, 0.22)');
      g.addColorStop(0.86, 'rgba(90, 106, 128, 0.32)');
      g.addColorStop(1, 'rgba(255, 255, 255, 0.10)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(118, 134, 156, 0.16)';
      ctx.lineWidth = 1;
      for (let rr = r * 0.32; rr < r; rr += r * 0.27) {
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  if ('colorSpace' in tex) (tex as any).colorSpace = (THREE as any).SRGBColorSpace; else (tex as any).encoding = (THREE as any).sRGBEncoding;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/** Satiné circulaire (roughness variation on wheels). */
export function createRadialBrushTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#9C9C9C';
  ctx.fillRect(0, 0, 512, 512);
  const cx = 256;
  const cy = 256;
  for (let i = 0; i < 2400; i++) {
    const a = Math.random() * Math.PI * 2;
    const r0 = Math.random() * 258;
    const r1 = r0 + 10 + Math.random() * 42;
    const v = 120 + Math.floor(Math.random() * 110);
    ctx.strokeStyle = `rgba(${v}, ${v}, ${v}, 0.15)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Halo doux sous le calibre (plan d'établi). */
export function createRadialFloorGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const g = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
  g.addColorStop(0, 'rgba(64, 78, 100, 0.50)');
  g.addColorStop(0.55, 'rgba(34, 44, 60, 0.22)');
  g.addColorStop(1, 'rgba(8, 10, 15, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(canvas);
}

/** Procedural 3D Spoked Gear Generator with Beveled Rims & Authentic Club Teeth. */
export function createProceduralGearMesh(
  outerRadius: number,
  innerRadius: number,
  teethCount: number,
  thickness: number,
  material: THREE.Material,
  spokeCount = 5,
  clubTeeth = false
): THREE.Mesh {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teethCount;

  if (clubTeeth) {
    const rootRadius = outerRadius * 0.72;
    const midStalkRadius = outerRadius * 0.91;
    for (let i = 0; i < teethCount; i++) {
      const a0 = i * step;
      const agullet = a0 + step * 0.18;
      const aLock = a0 + step * 0.34;
      const aImpulse = a0 + step * 0.56;
      const aHeel = a0 + step * 0.46;

      if (i === 0) {
        shape.moveTo(Math.cos(a0) * rootRadius, Math.sin(a0) * rootRadius);
      } else {
        shape.lineTo(Math.cos(a0) * rootRadius, Math.sin(a0) * rootRadius);
      }
      shape.lineTo(Math.cos(agullet) * rootRadius, Math.sin(agullet) * rootRadius);
      shape.lineTo(Math.cos(aLock) * midStalkRadius, Math.sin(aLock) * midStalkRadius);
      shape.lineTo(Math.cos(aImpulse) * outerRadius, Math.sin(aImpulse) * outerRadius);
      shape.lineTo(Math.cos(aHeel) * (outerRadius * 0.86), Math.sin(aHeel) * (outerRadius * 0.86));
    }
  } else {
    const toothHeight = outerRadius * 0.082;
    const rootRadius = outerRadius - toothHeight;

    for (let i = 0; i < teethCount; i++) {
      const a0 = i * step;
      const a1 = a0 + step * 0.22;
      const a2 = a0 + step * 0.48;
      const a3 = a0 + step * 0.68;
      const a4 = (i + 1) * step;

      if (i === 0) {
        shape.moveTo(Math.cos(a0) * rootRadius, Math.sin(a0) * rootRadius);
      } else {
        shape.lineTo(Math.cos(a0) * rootRadius, Math.sin(a0) * rootRadius);
      }
      shape.lineTo(Math.cos(a1) * outerRadius, Math.sin(a1) * outerRadius);
      shape.lineTo(Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius);
      shape.lineTo(Math.cos(a3) * rootRadius, Math.sin(a3) * rootRadius);
      shape.lineTo(Math.cos(a4) * rootRadius, Math.sin(a4) * rootRadius);
    }
  }

  if (spokeCount > 0 && innerRadius > 0.35) {
    const hubRadius = innerRadius * 0.34;
    const windowOuter = outerRadius * (clubTeeth ? 0.63 : 0.76);
    const spokeAngle = (Math.PI * 2) / spokeCount;
    const gapMargin = 0.16;

    for (let s = 0; s < spokeCount; s++) {
      const sa0 = s * spokeAngle + gapMargin;
      const sa1 = (s + 1) * spokeAngle - gapMargin;
      if (sa1 > sa0) {
        const hole = new THREE.Path();
        hole.moveTo(Math.cos(sa0) * hubRadius, Math.sin(sa0) * hubRadius);
        hole.lineTo(Math.cos(sa0) * windowOuter, Math.sin(sa0) * windowOuter);
        hole.absarc(0, 0, windowOuter, sa0, sa1, false);
        hole.lineTo(Math.cos(sa1) * hubRadius, Math.sin(sa1) * hubRadius);
        hole.absarc(0, 0, hubRadius, sa1, sa0, true);
        shape.holes.push(hole);
      }
    }
  }

  const extrudeSettings = {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.rotateX(Math.PI / 2);
  geom.translate(0, thickness / 2, 0);
  return new THREE.Mesh(geom, material);
}

/** Châton rubis (avec anneau lyre Incabloc en option). */
export function createRubyJewelUnit(
  radius = 0.34,
  withIncabloc = false,
  matRuby?: THREE.Material,
  matGold?: THREE.Material
): THREE.Group {
  const group = new THREE.Group();
  const chaton = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.25, radius * 1.25, 0.14, 24), matGold);
  const ruby = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.18, 24), matRuby);
  const rubyDome = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.92, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    matRuby
  );
  rubyDome.position.y = 0.09;
  rubyDome.scale.y = 0.42;
  group.add(chaton, ruby, rubyDome);

  if (withIncabloc) {
    const lyreRing = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.15, 0.045, 8, 24), matGold);
    lyreRing.rotation.x = Math.PI / 2;
    lyreRing.position.y = 0.1;
    group.add(lyreRing);
  }
  return group;
}

/** Vis bleuie à feu, chanfrein poli, fente sombre (option pas à gauche). */
export function createBluedScrew(
  x: number,
  y: number,
  z: number,
  matBlued: THREE.Material,
  leftHandSlot = false
): THREE.Group {
  const grp = new THREE.Group();
  grp.position.set(x, y, z);
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.11, 24), matBlued);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.03, 8, 24), matBlued);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.05;
  const slotMat = new THREE.MeshBasicMaterial({ color: 0x05070b });
  const slot1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.045, 0.055), slotMat);
  slot1.position.y = 0.052;
  grp.add(head, rim, slot1);

  if (leftHandSlot) {
    const slot2 = slot1.clone();
    slot2.position.set(0, 0.052, 0.11);
    grp.add(slot2);
  }
  return grp;
}

/** Châton de pont : baguette or + rubis + coupelle d'huile. */
export function createBridgeChaton(
  x: number,
  z: number,
  rChaton = 0.58,
  rRuby = 0.3,
  matBrightGold?: THREE.Material,
  matRuby?: THREE.Material
): THREE.Group {
  const chatonGrp = new THREE.Group();
  chatonGrp.position.set(x, 0.25, z);

  const chatonGeom = new THREE.CylinderGeometry(rChaton, rChaton * 0.92, 0.09, 32);
  const chatonMesh = new THREE.Mesh(chatonGeom, matBrightGold);

  const rubyGeom = new THREE.CylinderGeometry(rRuby, rRuby, 0.11, 24);
  const rubyMesh = new THREE.Mesh(rubyGeom, matRuby);

  const oilSinkGeom = new THREE.CylinderGeometry(rRuby * 0.38, rRuby * 0.18, 0.06, 16);
  const oilSinkMesh = new THREE.Mesh(oilSinkGeom, new THREE.MeshBasicMaterial({ color: 0x2a050a }));
  oilSinkMesh.position.y = 0.045;

  chatonGrp.add(chatonMesh, rubyMesh, oilSinkMesh);
  return chatonGrp;
}

/** Cadran soleillé anthracite, minuterie, petite seconde 9h & signature. */
export function createModernDialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const cx = 512;
  const cy = 512;

  const dialGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 510);
  dialGrad.addColorStop(0, '#242B3A');
  dialGrad.addColorStop(0.5, '#151A26');
  dialGrad.addColorStop(0.85, '#0D1017');
  dialGrad.addColorStop(1, '#06080C');
  ctx.fillStyle = dialGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 510, 0, Math.PI * 2);
  ctx.fill();

  // Sunburst brushing : 240 ultra-fine rays
  for (let i = 0; i < 240; i++) {
    const rad = (i / 240) * Math.PI * 2;
    const alpha = 0.02 + (Math.sin(rad * 8) * 0.5 + 0.5) * 0.05;
    ctx.strokeStyle = `rgba(225, 238, 255, ${alpha.toFixed(3)})`;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(rad) * 505, cy + Math.sin(rad) * 505);
    ctx.stroke();
  }

  const rTrack = 476;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, rTrack, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, rTrack - 16, 0, Math.PI * 2);
  ctx.stroke();

  for (let m = 0; m < 60; m++) {
    const angle = (m / 60) * Math.PI * 2 - Math.PI / 2;
    const is5 = m % 5 === 0;
    const l = is5 ? 16 : 8;
    const rOuter = rTrack;
    const rInner = rTrack - l;

    ctx.strokeStyle = is5 ? '#FFFFFF' : 'rgba(203, 213, 225, 0.65)';
    ctx.lineWidth = is5 ? 2.5 : 1.2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
    ctx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
    ctx.stroke();
  }

  const subX = 189;
  const subY = 524;
  const subR = 125;
  const subGrad = ctx.createRadialGradient(subX, subY, 5, subX, subY, subR);
  subGrad.addColorStop(0, '#1C222E');
  subGrad.addColorStop(1, '#0A0C12');
  ctx.fillStyle = subGrad;
  ctx.beginPath();
  ctx.arc(subX, subY, subR, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 1;
  for (let r = 16; r < subR - 4; r += 7) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.arc(subX, subY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(subX, subY, subR, 0, Math.PI * 2);
  ctx.stroke();

  for (let s = 0; s < 60; s += 5) {
    const rad = (s / 60) * Math.PI * 2 - Math.PI / 2;
    const isMajor = s % 15 === 0;
    const tickL = isMajor ? 11 : 6;
    ctx.strokeStyle = isMajor ? '#FFFFFF' : 'rgba(226, 232, 240, 0.65)';
    ctx.lineWidth = isMajor ? 2.2 : 1.2;
    ctx.beginPath();
    ctx.moveTo(subX + Math.cos(rad) * (subR - tickL), subY + Math.sin(rad) * (subR - tickL));
    ctx.lineTo(subX + Math.cos(rad) * subR, subY + Math.sin(rad) * subR);
    ctx.stroke();
  }

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('60', subX, subY - subR + 22);
  ctx.fillText('30', subX, subY + subR - 22);
  ctx.fillText('15', subX + subR - 22, subY);
  ctx.fillText('45', subX - subR + 22, subY);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 23px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('HORLOLEARN', cx, cy - 215);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px "Courier New", monospace';
  ctx.fillText("UNITAS 6497-1 · 18'000 A/h", cx, cy - 188);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '600 13px sans-serif';
  ctx.fillText('SWISS  ·  MADE', cx, cy + 448);

  ctx.fillStyle = '#030508';
  ctx.fillRect(823 - 42, 512 - 30, 84, 60);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  if ('colorSpace' in tex) (tex as any).colorSpace = (THREE as any).SRGBColorSpace; else (tex as any).encoding = (THREE as any).sRGBEncoding;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/** Disque de quantième (guichet 3h). */
export function createDateDiscTexture(dayNumber: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#FFFFFF');
  g.addColorStop(0.7, '#F8FAFC');
  g.addColorStop(1, '#E2E8F0');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = 'rgba(15, 23, 42, 0.18)';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 246, 246);

  ctx.fillStyle = '#0F172A';
  ctx.font = '700 132px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(dayNumber).padStart(2, '0'), 128, 134);

  const tex = new THREE.CanvasTexture(canvas);
  if ('colorSpace' in tex) (tex as any).colorSpace = (THREE as any).SRGBColorSpace; else (tex as any).encoding = (THREE as any).sRGBEncoding;
  return tex;
}

/** Géométrie d'aiguille facettée Dauphine-Bâton (2 rives + arête médiane). */
export function createFacetedHandGeom(
  length: number,
  baseW: number,
  tipW: number,
  ridgeH: number
): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const verts = new Float32Array([
    0, -ridgeH, 0,
    -baseW / 2, 0, 0,
    -tipW / 2, 0, length,
    0, -ridgeH * 0.35, length + 0.22,
    0, -ridgeH, 0,
    0, -ridgeH * 0.35, length + 0.22,
    tipW / 2, 0, length,
    baseW / 2, 0, 0,
  ]);
  const indices = [0, 2, 1, 0, 3, 2, 4, 6, 5, 4, 7, 6];
  geom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}
