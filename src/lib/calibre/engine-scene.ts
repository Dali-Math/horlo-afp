/**
 * HorloLearn — Assemblage de la scène 3D du calibre ETA 6497-1 (Three.js r128).
 * Portage 1:1 du moteur HTML : hiérarchie trackball quaternion
 * scene -> calibreWorld (360°) -> calibrePivot (centrage organe) -> 7 layerGroups.
 */
import * as THREE from 'three';
import {
  createBluedScrew,
  createBridgeChaton,
  createCotesDeGeneveTexture,
  createFacetedHandGeom,
  createModernDialTexture,
  createPerlageTexture,
  createProceduralGearMesh,
  createRadialBrushTexture,
  createRadialFloorGlowTexture,
  createRubyJewelUnit,
  createStudioEnvironment,
  createDateDiscTexture,
  setMaxAnisotropy,
} from './geometry';

export interface CalibreMeshes {
  barrel?: THREE.Object3D;
  mainspringSpiral?: THREE.Object3D;
  ratchetWheel?: THREE.Object3D;
  crownWheel?: THREE.Object3D;
  centerWheel?: THREE.Object3D;
  thirdWheel?: THREE.Object3D;
  fourthWheel?: THREE.Object3D;
  escapeWheel?: THREE.Object3D;
  palletFork?: THREE.Object3D;
  balanceWheel?: THREE.Object3D;
  hairspring?: THREE.Object3D;
  windingCrown?: THREE.Object3D;
  hourHand?: THREE.Object3D;
  minuteHand?: THREE.Object3D;
  smallSecondsHand?: THREE.Object3D;
}

export interface CalibreSceneRefs {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  calibreWorld: THREE.Group;
  calibrePivot: THREE.Group;
  layerGroups: THREE.Group[];
  organMeshes: Record<string, THREE.Object3D>;
  bridgeMaterials: THREE.MeshStandardMaterial[];
  xrayMeshes: THREE.Mesh[];
  meshes: CalibreMeshes;
  rebuildMainspringSpiral: (chargePct: number) => void;
  dispose: () => void;
}

const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);

export function buildCalibreScene(container: HTMLDivElement, xrayFactor: number): CalibreSceneRefs {
  const w = container.clientWidth || 800;
  const h = container.clientHeight || 560;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 300);
  camera.position.set(0, 0, 23);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if ('outputColorSpace' in renderer) (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace; else (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction = 'none';
  setMaxAnisotropy(renderer.capabilities.getMaxAnisotropy());

  // Studio Horological Image-Based Lighting (HDR reflections on every metal)
  scene.environment = createStudioEnvironment(renderer);

  // Direct lights (key light casts soft PCF shadows onto the atelier bench)
  const ambient = new THREE.AmbientLight(0xd8e2f2, 0.42);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff6e0, 1.25);
  keyLight.position.set(14, 22, 18);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 90;
  keyLight.shadow.camera.left = -18;
  keyLight.shadow.camera.right = 18;
  keyLight.shadow.camera.top = 18;
  keyLight.shadow.camera.bottom = -18;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.55);
  rimLight.position.set(-16, 12, 14);
  scene.add(rimLight);

  const dialSideLight = new THREE.DirectionalLight(0xfffbe9, 0.65);
  dialSideLight.position.set(8, -18, 16);
  scene.add(dialSideLight);

  // Atelier bench : soft contact shadow catcher + subtle radial glow
  const FLOOR_Y = -11.0;
  const shadowCatcher = new THREE.Mesh(
    new THREE.CircleGeometry(28, 48),
    new THREE.ShadowMaterial({ opacity: 0.32 })
  );
  shadowCatcher.rotation.x = -Math.PI / 2;
  shadowCatcher.position.y = FLOOR_Y;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

  const glowPlane = new THREE.Mesh(
    new THREE.CircleGeometry(28, 48),
    new THREE.MeshBasicMaterial({ map: createRadialFloorGlowTexture(), transparent: true, depthWrite: false })
  );
  glowPlane.rotation.x = -Math.PI / 2;
  glowPlane.position.y = FLOOR_Y - 0.02;
  scene.add(glowPlane);

  // Horological Materials (Physically-based, HDR reflections)
  const matPlatine = new THREE.MeshStandardMaterial({ color: 0x9faab9, metalness: 0.92, roughness: 0.34, envMapIntensity: 0.9 });
  const perlageTexture = createPerlageTexture();
  const matMainPlate = new THREE.MeshStandardMaterial({
    color: 0xb6c2d1,
    metalness: 0.9,
    roughness: 0.36,
    map: perlageTexture,
    bumpMap: perlageTexture,
    bumpScale: 0.03,
    envMapIntensity: 0.85,
  });
  const radialBrush = createRadialBrushTexture();
  const matBrassGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1.0, roughness: 0.32, roughnessMap: radialBrush, envMapIntensity: 1.05 });
  const matBrightGold = new THREE.MeshStandardMaterial({ color: 0xf3e5ab, metalness: 1.0, roughness: 0.2, envMapIntensity: 1.1 });
  const matPolishedSteel = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 1.0, roughness: 0.14, envMapIntensity: 1.15 });
  const matDarkSteel = new THREE.MeshStandardMaterial({ color: 0x4e5a6a, metalness: 0.95, roughness: 0.38, envMapIntensity: 0.9 });
  const matBluedSteel = new THREE.MeshPhysicalMaterial({ color: 0x1d3fbf, metalness: 0.9, roughness: 0.22, clearcoat: 1.0, clearcoatRoughness: 0.12, envMapIntensity: 1.2 });
  const matNivaflex = new THREE.MeshStandardMaterial({ color: 0x9db4c4, metalness: 1.0, roughness: 0.28, envMapIntensity: 1.0 });
  const matRuby = new THREE.MeshPhysicalMaterial({
    color: 0xb50d30,
    metalness: 0.0,
    roughness: 0.06,
    transmission: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    emissive: 0x4a0416,
    emissiveIntensity: 0.35,
    envMapIntensity: 1.2,
  });
  const matRehaut = new THREE.MeshStandardMaterial({ color: 0x2a323f, metalness: 0.7, roughness: 0.5, side: THREE.DoubleSide });
  const matCaseSteel = new THREE.MeshStandardMaterial({ color: 0xd7dee8, metalness: 1.0, roughness: 0.18, side: THREE.DoubleSide, envMapIntensity: 1.1 });

  const cotesTexture = createCotesDeGeneveTexture();
  const bridgeMaterials: THREE.MeshStandardMaterial[] = [];
  const createBridgeMat = (hexColor = 0xd8e0e8) => {
    const m = new THREE.MeshStandardMaterial({
      color: hexColor,
      map: cotesTexture,
      bumpMap: cotesTexture,
      bumpScale: 0.02,
      metalness: 0.92,
      roughness: 0.26,
      envMapIntensity: 1.15,
      transparent: true,
      opacity: 1 - xrayFactor,
    });
    bridgeMaterials.push(m);
    return m;
  };

  // Trackball hierarchy
  const calibreWorld = new THREE.Group();
  const calibrePivot = new THREE.Group();
  calibreWorld.add(calibrePivot);
  scene.add(calibreWorld);

  const layerGroups: THREE.Group[] = [];
  for (let i = 0; i < 7; i++) {
    const lg = new THREE.Group();
    lg.userData.layerIndex = i;
    calibrePivot.add(lg);
    layerGroups.push(lg);
  }

  const organMeshes: Record<string, THREE.Object3D> = {};
  const meshes: CalibreMeshes = {};

  // =========================================================================
  // LAYER 0 : PLATINE PERLÉE, CADRAN SOLEILLÉ, GUICHET DATE & AIGUILLES
  // =========================================================================
  const platineGrp = new THREE.Group();

  const mainPlate = new THREE.Mesh(new THREE.CylinderGeometry(8.6, 8.6, 0.35, 72), matMainPlate);
  mainPlate.position.y = -0.35;
  platineGrp.add(mainPlate);

  const caseBand = new THREE.Mesh(new THREE.CylinderGeometry(9.35, 9.35, 1.15, 80, 1, true), matCaseSteel);
  caseBand.position.y = -1.15;
  platineGrp.add(caseBand);

  const rehaut = new THREE.Mesh(new THREE.CylinderGeometry(8.55, 8.05, 0.55, 72, 1, true), matRehaut);
  rehaut.position.y = -0.78;
  platineGrp.add(rehaut);

  [-2.4, 0.7].forEach((ang) => {
    const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.35), matPolishedSteel);
    clamp.position.set(Math.cos(ang) * 8.55, -0.15, Math.sin(ang) * 8.55);
    clamp.rotation.y = -ang;
    platineGrp.add(clamp);
  });

  const bezelRing = new THREE.Mesh(new THREE.TorusGeometry(8.65, 0.08, 12, 72), matBrassGold);
  bezelRing.rotation.x = Math.PI / 2;
  bezelRing.position.y = -0.18;
  platineGrp.add(bezelRing);

  // 2. Cadran Soleillé (Y = -0.53)
  const dialTexture = createModernDialTexture();
  const matDial = new THREE.MeshStandardMaterial({
    map: dialTexture,
    roughness: 0.32,
    metalness: 0.55,
    envMapIntensity: 0.7,
  });
  const dialMesh = new THREE.Mesh(new THREE.CircleGeometry(8.55, 72), matDial);
  dialMesh.position.y = -0.53;
  dialMesh.rotation.x = Math.PI / 2;
  dialMesh.userData.organId = 'dial';
  organMeshes.dial = platineGrp;
  platineGrp.add(dialMesh);

  // 3. Guichet de Date 3D et Disque de Quantième (à 3h : X = +5.2, Z = 0.0)
  const dateGrp = new THREE.Group();
  dateGrp.position.set(5.2, -0.54, 0.0);

  const todayDay = new Date().getDate();
  const dateDiscMat = new THREE.MeshBasicMaterial({ map: createDateDiscTexture(todayDay) });
  const dateDiscMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.24, 0.88), dateDiscMat);
  dateDiscMesh.rotation.x = Math.PI / 2;
  dateDiscMesh.position.y = 0.005;
  dateGrp.add(dateDiscMesh);

  const dateFrameShape = new THREE.Shape();
  const fw = 0.8;
  const fh = 0.6;
  dateFrameShape.moveTo(-fw, -fh);
  dateFrameShape.lineTo(fw, -fh);
  dateFrameShape.lineTo(fw, fh);
  dateFrameShape.lineTo(-fw, fh);
  dateFrameShape.closePath();

  const dateHole = new THREE.Path();
  const hw = 0.58;
  const hh = 0.4;
  dateHole.moveTo(-hw, -hh);
  dateHole.lineTo(hw, -hh);
  dateHole.lineTo(hw, hh);
  dateHole.lineTo(-hw, hh);
  dateHole.closePath();
  dateFrameShape.holes.push(dateHole);

  const dateFrameGeom = new THREE.ExtrudeGeometry(dateFrameShape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    bevelSegments: 3,
  });
  dateFrameGeom.rotateX(-Math.PI / 2);
  const dateFrameMesh = new THREE.Mesh(dateFrameGeom, matPolishedSteel);
  dateFrameMesh.position.y = -0.02;
  dateGrp.add(dateFrameMesh);
  dateGrp.userData.organId = 'dial';
  platineGrp.add(dateGrp);

  // 4. Index Bâtons Appliqués Facettés Modernes (12 Appliques)
  const indicesGrp = new THREE.Group();
  const matLumi = new THREE.MeshStandardMaterial({
    color: 0xeefff4,
    emissive: 0x1a4428,
    emissiveIntensity: 0.45,
    roughness: 0.5,
  });

  for (let hIdx = 1; hIdx <= 12; hIdx++) {
    const alpha = (hIdx / 12) * Math.PI * 2;
    const rIdx = 7.1;
    const ix = Math.sin(alpha) * rIdx;
    const iz = Math.cos(alpha) * rIdx;

    if (hIdx === 12) {
      [-0.18, 0.18].forEach((offset) => {
        const baton = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 1.15), matPolishedSteel);
        baton.position.set(offset, -0.56, 7.1);
        const lumi = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.82), matLumi);
        lumi.position.set(offset, -0.596, 7.1);
        indicesGrp.add(baton, lumi);
      });
    } else if (hIdx === 3) {
      const baton = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.65), matPolishedSteel);
      baton.position.set(7.05, -0.56, 0.0);
      baton.rotation.y = Math.PI / 2;
      indicesGrp.add(baton);
    } else if (hIdx === 9) {
      const baton = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.55), matPolishedSteel);
      baton.position.set(-7.4, -0.56, 0.0);
      baton.rotation.y = -Math.PI / 2;
      indicesGrp.add(baton);
    } else {
      const batonGrp = new THREE.Group();
      batonGrp.position.set(ix, -0.56, iz);
      batonGrp.rotation.y = -alpha + Math.PI;

      const baton = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.07, 1.15), matPolishedSteel);
      const lumi = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.8), matLumi);
      lumi.position.y = -0.036;
      batonGrp.add(baton, lumi);
      indicesGrp.add(batonGrp);
    }
  }
  platineGrp.add(indicesGrp);

  // 5. Aiguilles Modernes Facettées Dauphine-Bâton (Heures & Minutes)
  const handsCenterGrp = new THREE.Group();
  handsCenterGrp.position.set(0, 0, 0);

  const meshHourHand = new THREE.Group();
  meshHourHand.position.set(0, -0.63, 0);
  const hourBladeGeom = createFacetedHandGeom(4.4, 0.48, 0.16, 0.08);
  const hourBladeMesh = new THREE.Mesh(hourBladeGeom, matPolishedSteel);
  const hourCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.06, 24), matPolishedSteel);
  const hourLumi = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 2.8), matLumi);
  hourLumi.position.set(0, -0.045, 2.2);
  meshHourHand.add(hourBladeMesh, hourCollar, hourLumi);
  handsCenterGrp.add(meshHourHand);
  meshes.hourHand = meshHourHand;

  const meshMinuteHand = new THREE.Group();
  meshMinuteHand.position.set(0, -0.71, 0);
  const minBladeGeom = createFacetedHandGeom(6.85, 0.42, 0.12, 0.08);
  const minBladeMesh = new THREE.Mesh(minBladeGeom, matPolishedSteel);
  const minCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 24), matPolishedSteel);
  const minLumi = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 4.6), matLumi);
  minLumi.position.set(0, -0.045, 3.5);
  meshMinuteHand.add(minBladeMesh, minCollar, minLumi);
  handsCenterGrp.add(meshMinuteHand);
  meshes.minuteHand = meshMinuteHand;

  const centerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 24), matPolishedSteel);
  centerCap.position.set(0, -0.76, 0);
  const centerCapDome = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    matPolishedSteel
  );
  centerCapDome.rotation.x = Math.PI;
  centerCapDome.position.set(0, -0.81, 0);
  handsCenterGrp.add(centerCap, centerCapDome);
  platineGrp.add(handsCenterGrp);

  // 6. Aiguille de Petite Seconde à 9h
  const meshSmallSecondsHand = new THREE.Group();
  meshSmallSecondsHand.position.set(-5.4, -0.62, 0.0);
  const secLance = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 1.65), matPolishedSteel);
  secLance.position.set(0, 0, 0.825);
  const secCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16), matPolishedSteel);
  const secCounterweight = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 8, 24), matPolishedSteel);
  secCounterweight.rotation.x = Math.PI / 2;
  secCounterweight.position.set(0, 0, -0.32);
  meshSmallSecondsHand.add(secLance, secCenter, secCounterweight);
  platineGrp.add(meshSmallSecondsHand);
  meshes.smallSecondsHand = meshSmallSecondsHand;

  layerGroups[0].add(platineGrp);

  // =========================================================================
  // LAYER 1 : SYSTÈME DE REMONTOIR & MISE À L'HEURE (À 3H : X = +6.8, Z = 0)
  // =========================================================================
  const windingGrp = new THREE.Group();
  windingGrp.userData.organId = 'winding';
  organMeshes.winding = windingGrp;

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5.2, 16), matPolishedSteel);
  stem.rotation.z = Math.PI / 2;
  stem.position.set(7.2, 0.2, 0);
  windingGrp.add(stem);

  const meshWindingCrown = createProceduralGearMesh(1.15, 0.2, 24, 0.65, matPolishedSteel, 0);
  meshWindingCrown.rotation.z = Math.PI / 2;
  meshWindingCrown.position.set(9.8, 0.2, 0);
  windingGrp.add(meshWindingCrown);
  meshes.windingCrown = meshWindingCrown;

  const crownGrip = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.17, 12, 32), matPolishedSteel);
  crownGrip.rotation.y = Math.PI / 2;
  crownGrip.position.set(9.8, 0.2, 0);
  windingGrp.add(crownGrip);
  const crownCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.98, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    matPolishedSteel
  );
  crownCap.rotation.z = Math.PI / 2;
  crownCap.scale.x = 0.35;
  crownCap.position.set(10.45, 0.2, 0);
  windingGrp.add(crownCap);

  const slidingPinion = createProceduralGearMesh(0.58, 0.2, 12, 0.55, matPolishedSteel, 0);
  slidingPinion.rotation.z = Math.PI / 2;
  slidingPinion.position.set(6.2, 0.2, 0);
  windingGrp.add(slidingPinion);

  const windingPinion = createProceduralGearMesh(0.66, 0.2, 14, 0.45, matDarkSteel, 0);
  windingPinion.rotation.z = Math.PI / 2;
  windingPinion.position.set(7.5, 0.2, 0);
  windingGrp.add(windingPinion);

  const yokeMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.45), matPolishedSteel);
  yokeMesh.position.set(6.4, -0.05, 0.9);
  yokeMesh.rotation.y = 0.35;
  windingGrp.add(yokeMesh);

  layerGroups[1].add(windingGrp);

  // =========================================================================
  // LAYER 2 : BARILLET, RESSORT NIVAFLEX & ROCHET (À 1H30 : X = +4.5, Z = -3.2)
  // =========================================================================
  const barrelOrganGrp = new THREE.Group();
  barrelOrganGrp.position.set(4.5, 0.25, -3.2);
  barrelOrganGrp.userData.organId = 'barrel';
  organMeshes.barrel = barrelOrganGrp;

  const meshBarrel = new THREE.Group();
  const barrelDrumGear = createProceduralGearMesh(3.35, 2.85, 84, 0.45, matBrassGold, 6);
  meshBarrel.add(barrelDrumGear);

  const barrelDrumFloor = new THREE.Mesh(new THREE.CylinderGeometry(2.82, 2.82, 0.09, 56), matBrassGold);
  barrelDrumFloor.position.y = -0.42;
  meshBarrel.add(barrelDrumFloor);

  const barrelArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.4, 24), matPolishedSteel);
  barrelArbor.position.y = 0.5;
  meshBarrel.add(barrelArbor);

  const meshMainspringSpiral = new THREE.Group();
  meshMainspringSpiral.position.y = 0.28;
  meshBarrel.add(meshMainspringSpiral);
  meshes.mainspringSpiral = meshMainspringSpiral;
  meshes.barrel = meshBarrel;

  barrelOrganGrp.add(meshBarrel);
  layerGroups[2].add(barrelOrganGrp);

  // =========================================================================
  // LAYER 3 : LA CHAÎNE CINÉMATIQUE (CENTRE Z=64, MOYENNE Z=60, SECONDE 9H Z=60)
  // =========================================================================
  const centerGrp = new THREE.Group();
  centerGrp.position.set(0, 0.42, 0);
  centerGrp.userData.organId = 'centerWheel';
  organMeshes.centerWheel = centerGrp;

  const meshCenterWheel = new THREE.Group();
  const cwGear = createProceduralGearMesh(2.55, 2.1, 64, 0.16, matBrassGold, 5);
  const cwPinion = createProceduralGearMesh(0.48, 0.15, 12, 0.75, matPolishedSteel, 0);
  cwPinion.position.y = -0.35;
  const cwArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.9, 16), matPolishedSteel);
  meshCenterWheel.add(cwGear, cwPinion, cwArbor);
  centerGrp.add(meshCenterWheel);
  centerGrp.add(createRubyJewelUnit(0.38, false, matRuby, matBrassGold));
  layerGroups[3].add(centerGrp);
  meshes.centerWheel = meshCenterWheel;

  const thirdGrp = new THREE.Group();
  thirdGrp.position.set(-3.2, 0.68, -2.8);
  thirdGrp.userData.organId = 'thirdWheel';
  organMeshes.thirdWheel = thirdGrp;

  const meshThirdWheel = new THREE.Group();
  const twGear = createProceduralGearMesh(2.15, 1.75, 60, 0.15, matBrassGold, 5);
  const twPinion = createProceduralGearMesh(0.42, 0.12, 8, 0.65, matPolishedSteel, 0);
  twPinion.position.y = -0.32;
  const twArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.4, 16), matPolishedSteel);
  meshThirdWheel.add(twGear, twPinion, twArbor);
  thirdGrp.add(meshThirdWheel);
  thirdGrp.add(createRubyJewelUnit(0.32, false, matRuby, matBrassGold));
  layerGroups[3].add(thirdGrp);
  meshes.thirdWheel = meshThirdWheel;

  const fourthGrp = new THREE.Group();
  fourthGrp.position.set(-5.4, 0.48, 0.2);
  fourthGrp.userData.organId = 'fourthWheel';
  organMeshes.fourthWheel = fourthGrp;

  const meshFourthWheel = new THREE.Group();
  const fwGear = createProceduralGearMesh(2.1, 1.72, 60, 0.15, matBrightGold, 5);
  const fwPinion = createProceduralGearMesh(0.4, 0.12, 8, 0.65, matPolishedSteel, 0);
  fwPinion.position.y = 0.05;
  const fwArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.85, 16), matPolishedSteel);
  meshFourthWheel.add(fwGear, fwPinion, fwArbor);
  fourthGrp.add(meshFourthWheel);
  fourthGrp.add(createRubyJewelUnit(0.32, false, matRuby, matBrassGold));
  layerGroups[3].add(fourthGrp);
  meshes.fourthWheel = meshFourthWheel;

  // =========================================================================
  // LAYER 4 : ÉCHAPPEMENT À ANCRE SUISSE (ROUE CLUB & ANCRE)
  // =========================================================================
  const escapeGrp = new THREE.Group();
  escapeGrp.position.set(-2.8, 0.35, 3.9);
  escapeGrp.userData.organId = 'escapeWheel';
  organMeshes.escapeWheel = escapeGrp;

  const meshEscapeWheel = new THREE.Group();
  const ewGear = createProceduralGearMesh(1.52, 1.08, 15, 0.14, matPolishedSteel, 4, true);
  const ewPinion = createProceduralGearMesh(0.32, 0.1, 6, 0.55, matDarkSteel, 0);
  ewPinion.position.y = 0.05;
  const ewArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.35, 16), matPolishedSteel);
  meshEscapeWheel.add(ewGear, ewPinion, ewArbor);
  escapeGrp.add(meshEscapeWheel);
  escapeGrp.add(createRubyJewelUnit(0.28, false, matRuby, matBrassGold));
  layerGroups[4].add(escapeGrp);
  meshes.escapeWheel = meshEscapeWheel;

  const palletGrp = new THREE.Group();
  palletGrp.position.set(-0.6, 0.4, 4.2);
  palletGrp.userData.organId = 'palletFork';
  organMeshes.palletFork = palletGrp;

  const meshPalletFork = new THREE.Group();
  const anchorShape = new THREE.Shape();
  anchorShape.moveTo(-0.2, 0.15);
  anchorShape.lineTo(-1.35, 0.85);
  anchorShape.lineTo(-1.55, 0.65);
  anchorShape.lineTo(-0.35, -0.05);
  anchorShape.lineTo(-1.15, -1.05);
  anchorShape.lineTo(-0.92, -1.22);
  anchorShape.lineTo(0.15, -0.15);
  anchorShape.lineTo(2.15, -0.42);
  anchorShape.lineTo(2.58, -0.22);
  anchorShape.lineTo(2.48, -0.1);
  anchorShape.lineTo(2.22, -0.26);
  anchorShape.lineTo(2.28, -0.58);
  anchorShape.lineTo(2.58, -0.64);
  anchorShape.lineTo(2.62, -0.5);
  anchorShape.lineTo(2.18, -0.6);
  anchorShape.lineTo(0.05, 0.15);
  anchorShape.closePath();

  const anchorExtrude = new THREE.ExtrudeGeometry(anchorShape, {
    depth: 0.11,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });
  anchorExtrude.rotateX(Math.PI / 2);
  const anchorBodyMesh = new THREE.Mesh(anchorExtrude, matPolishedSteel);
  meshPalletFork.add(anchorBodyMesh);

  const guardPinDard = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.55, 12), matBrassGold);
  guardPinDard.rotation.z = Math.PI / 2;
  guardPinDard.rotation.y = 0.18;
  guardPinDard.position.set(2.42, -0.08, 0.42);
  meshPalletFork.add(guardPinDard);

  const entryRuby = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.18, 0.16), matRuby);
  entryRuby.position.set(-1.45, -0.02, -0.72);
  entryRuby.rotation.y = -0.52;

  const exitRuby = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.18, 0.16), matRuby);
  exitRuby.position.set(-1.08, -0.02, 1.05);
  exitRuby.rotation.y = 0.65;

  const matMoebius9415 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, transparent: true, opacity: 0.85 });
  const oilFilmEntry = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), matMoebius9415);
  oilFilmEntry.position.set(-1.62, -0.02, -0.62);
  const oilFilmExit = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), matMoebius9415);
  oilFilmExit.position.set(-1.26, -0.02, 1.12);

  const palletArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.05, 16), matPolishedSteel);
  meshPalletFork.add(entryRuby, exitRuby, oilFilmEntry, oilFilmExit, palletArbor);

  const bankingPin1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.45, 12), matBrassGold);
  bankingPin1.position.set(1.55, -0.05, 0.08);
  const bankingPin2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.45, 12), matBrassGold);
  bankingPin2.position.set(1.45, -0.05, 0.62);
  palletGrp.add(bankingPin1, bankingPin2);

  palletGrp.add(meshPalletFork);
  palletGrp.add(createRubyJewelUnit(0.26, false, matRuby, matBrassGold));
  layerGroups[4].add(palletGrp);
  meshes.palletFork = meshPalletFork;

  // =========================================================================
  // LAYER 5 : BALANCIER GLUCYDUR, DOUBLE PLATEAU, ELLIPSE RUBIS & SPIRAL (À 5H)
  // =========================================================================
  const balanceGrp = new THREE.Group();
  balanceGrp.position.set(2.8, 0.65, 3.6);
  balanceGrp.userData.organId = 'balance';
  organMeshes.balance = balanceGrp;

  const meshBalanceWheel = new THREE.Group();
  const balRim = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.16, 16, 56), matBrassGold);
  balRim.rotation.x = Math.PI / 2;
  meshBalanceWheel.add(balRim);

  const balArm1 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.09, 0.24), matBrassGold);
  const balArm2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 5.6), matBrassGold);
  meshBalanceWheel.add(balArm1, balArm2);

  for (let s = 0; s < 16; s++) {
    const ang = (s / 16) * Math.PI * 2;
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.28, 8), matBrightGold);
    screw.rotation.z = Math.PI / 2;
    screw.rotation.y = -ang;
    screw.position.set(Math.cos(ang) * 3.0, 0, Math.sin(ang) * 3.0);
    meshBalanceWheel.add(screw);
  }

  const largeRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.1, 32), matPolishedSteel);
  largeRoller.position.y = -0.2;

  const safetyRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.14, 28), matDarkSteel);
  safetyRoller.position.y = -0.32;

  const impulseRubyPin = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.28, 16), matRuby);
  impulseRubyPin.position.set(-0.62, -0.28, 0.18);

  const balArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.45, 16), matPolishedSteel);
  meshBalanceWheel.add(largeRoller, safetyRoller, impulseRubyPin, balArbor);
  balanceGrp.add(meshBalanceWheel);
  meshes.balanceWheel = meshBalanceWheel;

  const meshHairspring = new THREE.Group();
  meshHairspring.position.y = 0.26;
  const hsPoints: THREE.Vector3[] = [];
  const hsTurns = 6.5;
  for (let i = 0; i <= 160; i++) {
    const t = i / 160;
    const ang = t * hsTurns * Math.PI * 2;
    const r = 0.25 + t * 1.45;
    hsPoints.push(new THREE.Vector3(Math.cos(ang) * r, 0, Math.sin(ang) * r));
  }
  const hsCurve = new THREE.CatmullRomCurve3(hsPoints);
  const hsGeom = new THREE.TubeGeometry(hsCurve, 120, 0.025, 6, false);
  meshHairspring.add(new THREE.Mesh(hsGeom, matNivaflex));
  balanceGrp.add(meshHairspring);
  meshes.hairspring = meshHairspring;

  const incablocUnit = createRubyJewelUnit(0.38, true, matRuby, matBrassGold);
  incablocUnit.position.y = 0.55;
  balanceGrp.add(incablocUnit);
  layerGroups[5].add(balanceGrp);

  // =========================================================================
  // LAYER 6 : PONTS SUPÉRIEURS CÔTES DE GENÈVE, ROCHET, COURONNE & COQ SCULPTÉ
  // =========================================================================
  const bridgesTopGrp = new THREE.Group();
  bridgesTopGrp.position.y = 1.05;

  // 1. Pont de Barillet Sculpté avec Côtes de Genève
  const matBarrelBridge = createBridgeMat(0xe2e8f0);
  const barrelBridgeShape = new THREE.Shape();
  barrelBridgeShape.moveTo(8.5, 0.05);
  barrelBridgeShape.absarc(0, 0, 8.5, 0.05, -1.64, true);
  barrelBridgeShape.quadraticCurveTo(0.6, -5.2, 1.1, -1.8);
  barrelBridgeShape.quadraticCurveTo(1.4, -0.6, 2.2, 0.1);
  barrelBridgeShape.quadraticCurveTo(5.5, 0.2, 8.5, 0.05);
  barrelBridgeShape.closePath();

  const barrelBridgeGeom = new THREE.ExtrudeGeometry(barrelBridgeShape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSize: 0.075,
    bevelThickness: 0.075,
    bevelSegments: 4,
  });
  barrelBridgeGeom.rotateX(Math.PI / 2);
  const barrelBridgeMesh = new THREE.Mesh(barrelBridgeGeom, matBarrelBridge);
  barrelBridgeMesh.position.y = 0.12;
  barrelBridgeMesh.userData.organId = 'barrel';
  bridgesTopGrp.add(barrelBridgeMesh);

  const meshRatchetWheel = createProceduralGearMesh(2.55, 0.55, 48, 0.2, matPolishedSteel, 0);
  meshRatchetWheel.position.set(4.5, 0.25, -3.2);
  meshRatchetWheel.userData.organId = 'barrel';
  meshRatchetWheel.add(createBluedScrew(0, 0.14, 0, matBluedSteel, false));
  bridgesTopGrp.add(meshRatchetWheel);
  meshes.ratchetWheel = meshRatchetWheel;

  const meshCrownWheel = createProceduralGearMesh(1.52, 0.45, 34, 0.2, matPolishedSteel, 0);
  meshCrownWheel.position.set(6.4, 0.25, -0.8);
  meshCrownWheel.userData.organId = 'winding';
  meshCrownWheel.add(createBluedScrew(0, 0.16, 0, matBluedSteel, true));
  bridgesTopGrp.add(meshCrownWheel);
  meshes.crownWheel = meshCrownWheel;

  const clickBody = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.18, 16), matPolishedSteel);
  clickBody.position.set(2.1, 0.24, -4.8);
  const clickBeak = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.16, 0.24), matPolishedSteel);
  clickBeak.position.set(2.4, 0.24, -4.4);
  bridgesTopGrp.add(clickBody, clickBeak);

  bridgesTopGrp.add(
    createBluedScrew(6.6, 0.24, -4.5, matBluedSteel),
    createBluedScrew(2.5, 0.24, -6.8, matBluedSteel),
    createBluedScrew(5.4, 0.24, -0.4, matBluedSteel)
  );

  // 2. Grand Pont de Rouage avec 4 Châtons Or & Rubis
  const matTrainBridge = createBridgeMat(0xe2e8f0);
  const trainBridgeShape = new THREE.Shape();
  trainBridgeShape.moveTo(-0.8, -8.45);
  trainBridgeShape.quadraticCurveTo(0.4, -5.2, 0.9, -2.0);
  trainBridgeShape.quadraticCurveTo(1.4, -0.6, 1.8, 0.4);
  trainBridgeShape.quadraticCurveTo(0.8, 1.2, 0.0, 2.0);
  trainBridgeShape.quadraticCurveTo(-1.2, 2.8, -1.8, 4.4);
  trainBridgeShape.quadraticCurveTo(-3.2, 5.4, -4.5, 7.2);
  trainBridgeShape.absarc(0, 0, 8.5, 2.13, 4.62, false);
  trainBridgeShape.closePath();

  const trainBridgeGeom = new THREE.ExtrudeGeometry(trainBridgeShape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSize: 0.075,
    bevelThickness: 0.075,
    bevelSegments: 4,
  });
  trainBridgeGeom.rotateX(Math.PI / 2);
  const trainBridgeMesh = new THREE.Mesh(trainBridgeGeom, matTrainBridge);
  trainBridgeMesh.position.y = 0.12;
  trainBridgeMesh.userData.organId = 'centerWheel';
  bridgesTopGrp.add(trainBridgeMesh);

  bridgesTopGrp.add(
    createBridgeChaton(0.0, 0.0, 0.65, 0.32, matBrightGold, matRuby),
    createBridgeChaton(-3.2, -2.8, 0.58, 0.28, matBrightGold, matRuby),
    createBridgeChaton(-5.4, 0.2, 0.58, 0.28, matBrightGold, matRuby),
    createBridgeChaton(-2.8, 3.9, 0.52, 0.25, matBrightGold, matRuby)
  );

  bridgesTopGrp.add(
    createBluedScrew(-7.2, 0.24, -1.8, matBluedSteel),
    createBluedScrew(-4.8, 0.24, 5.2, matBluedSteel),
    createBluedScrew(-2.4, 0.24, -6.8, matBluedSteel),
    createBluedScrew(-1.6, 0.24, -1.6, matBluedSteel)
  );

  // 3. Coq de Balancier Sculpté ETA 6497-1 (bras élancé, porte-piton, raquette A/R)
  const matBalanceCock = createBridgeMat(0xe2e8f0);
  const cockShape = new THREE.Shape();
  cockShape.moveTo(6.9, -4.5);
  cockShape.quadraticCurveTo(7.4, -5.6, 5.6, -6.4);
  cockShape.quadraticCurveTo(4.0, -5.1, 2.8, -4.35);
  cockShape.absarc(2.8, -3.6, 0.78, -Math.PI / 2, Math.PI / 2, true);
  cockShape.quadraticCurveTo(4.6, -3.4, 6.9, -4.5);
  cockShape.closePath();

  const cockGeom = new THREE.ExtrudeGeometry(cockShape, {
    depth: 0.26,
    bevelEnabled: true,
    bevelSize: 0.06,
    bevelThickness: 0.06,
    bevelSegments: 3,
  });
  cockGeom.rotateX(Math.PI / 2);
  const cockMesh = new THREE.Mesh(cockGeom, matBalanceCock);
  cockMesh.position.y = 0.14;
  cockMesh.userData.organId = 'balance';
  bridgesTopGrp.add(cockMesh);

  bridgesTopGrp.add(createBluedScrew(6.1, 0.26, 5.4, matBluedSteel));

  // Regulator Index Pointer & Etachron Stud Holder on Balance Cock
  const regulatorRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 10, 24), matPolishedSteel);
  regulatorRing.rotation.x = Math.PI / 2;
  regulatorRing.position.set(2.8, 0.26, 3.6);
  const regulatorPointer = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.07, 0.15), matBrassGold);
  regulatorPointer.position.set(3.2, 0.28, 3.8);
  regulatorPointer.rotation.y = 0.45;
  bridgesTopGrp.add(regulatorRing, regulatorPointer);

  layerGroups[6].add(bridgesTopGrp);

  // Enable soft PCF shadows on every movement mesh + collect X-ray bridge meshes
  const xrayMeshes: THREE.Mesh[] = [];
  calibreWorld.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  calibreWorld.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh && mesh.material && bridgeMaterials.indexOf(mesh.material as THREE.MeshStandardMaterial) !== -1) {
      xrayMeshes.push(mesh);
    }
  });

  // Platine perlée : matériau référencé pour shadow toggle (identique original)
  void matPlatine;

  const rebuildMainspringSpiral = (chargePct: number) => {
    while (meshMainspringSpiral.children.length > 0) {
      const old = meshMainspringSpiral.children[0] as THREE.Mesh;
      if (old.geometry) old.geometry.dispose();
      meshMainspringSpiral.remove(old);
    }

    const chargeRatio = chargePct / 100;
    const turns = 5.5 + chargeRatio * 3.5;
    const pts: THREE.Vector3[] = [];
    const maxR = 2.85 - chargeRatio * 0.55;
    const minR = 0.72;

    for (let i = 0; i <= 180; i++) {
      const t = i / 180;
      const ang = t * turns * Math.PI * 2;
      const r = minR + Math.pow(t, 0.85 + chargeRatio * 0.4) * (maxR - minR);
      pts.push(new THREE.Vector3(Math.cos(ang) * r, 0, Math.sin(ang) * r));
    }

    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeom = new THREE.TubeGeometry(curve, 150, 0.055, 6, false);
    meshMainspringSpiral.add(new THREE.Mesh(tubeGeom, matNivaflex));
  };

  const dispose = () => {
    scene.environment?.dispose?.();
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      }
    });
    cotesTexture.dispose();
    perlageTexture.dispose();
    radialBrush.dispose();
    dialTexture.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
  };

  return {
    scene,
    camera,
    renderer,
    calibreWorld,
    calibrePivot,
    layerGroups,
    organMeshes,
    bridgeMaterials,
    xrayMeshes,
    meshes,
    rebuildMainspringSpiral: (pct: number) => rebuildMainspringSpiral(pct),
    dispose,
  };
}

export { AXIS_X, AXIS_Y };
