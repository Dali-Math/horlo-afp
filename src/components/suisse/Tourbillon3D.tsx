
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { X, MousePointer2 } from 'lucide-react';

interface Tourbillon3DProps {
  onClose: () => void;
  featureId?: string; // To distinguish between Tourbillon view and Movement view
}

// --- TEXTURE GENERATORS (Procedural High-Fidelity) ---

// 1. TEXTURE BROSSÉE (Satin Finish) - High Contrast & Detail
const createBrushedTexture = (width = 1024, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#888888'; 
    ctx.fillRect(0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    ctx.globalCompositeOperation = 'overlay';
    
    for (let i = 0; i < 12000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = 100 + Math.random() * 400;
      const opacity = 0.08 + Math.random() * 0.12;
      
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`;
      ctx.fillRect(x, y, length, 2);
    }

    for (let i = 0; i < 120000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = 20 + Math.random() * 150;
      const opacity = 0.05 + Math.random() * 0.15;
      
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`;
      ctx.fillRect(x, y, length, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16; 
  return texture;
};

// 2. TEXTURE MICRO-GRAIN (Sablage / Mat)
const createMicroGrainTexture = (width = 512, height = 512) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, width, height);
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for(let i=0; i<data.length; i+=4) {
            const val = (Math.random() - 0.5) * 50; 
            data[i] = Math.min(255, Math.max(0, 128 + val));
            data[i+1] = Math.min(255, Math.max(0, 128 + val));
            data[i+2] = Math.min(255, Math.max(0, 128 + val));
            data[i+3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;
    return texture;
};

// 3. TEXTURE PERLAGE
const createPerlageTexture = (width = 1024, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, width, height);

    const radius = 35; 
    const step = 22;

    for (let y = -radius; y < height + radius; y += step) {
      for (let x = -radius; x < width + radius; x += step) {
        const dx = x + (Math.random() - 0.5) * 4;
        const dy = y + (Math.random() - 0.5) * 4;

        const grad = ctx.createRadialGradient(dx, dy, 0, dx, dy, radius);
        grad.addColorStop(0, 'rgba(255,255,255,0.6)'); 
        grad.addColorStop(0.4, 'rgba(200,200,200,0.1)');
        grad.addColorStop(0.8, 'rgba(100,100,100,0.1)');
        grad.addColorStop(1, 'rgba(50,50,50,0.3)'); 

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dx, dy, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(dx, dy, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        for(let k=1; k<6; k++) {
            ctx.beginPath();
            ctx.arc(dx, dy, radius * (k/6), 0, Math.PI*2);
            ctx.stroke();
        }
        ctx.restore();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

// 4. TEXTURE GUILLOCHÉ
const createGuillocheTexture = (width = 1024, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#dcdcdc';
    ctx.fillRect(0, 0, width, height);
    
    ctx.lineWidth = 3;
    const step = 28;
    
    for (let i = -height; i < width; i += step) {
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + height, height); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath(); ctx.moveTo(i+2, 0); ctx.lineTo(i + height + 2, height); ctx.stroke();
    }

    for (let i = 0; i < width + height; i += step) {
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - height, height); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath(); ctx.moveTo(i+2, 0); ctx.lineTo(i - height + 2, height); ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  return texture;
};

// 5. TEXTURE POLIE (Poli Noir/Miroir)
const createPolishedTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#020202'; 
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = 2 + Math.random() * 15;
      const opacity = 0.05 + Math.random() * 0.1;
      
      ctx.fillStyle = `rgba(120,120,120,${opacity})`; 
      ctx.fillRect(x, y, length, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// 6. TEXTURE COLIMAÇONNAGE (Snailing for Barrel)
const createSnailingTexture = (width = 512, height = 512) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = '#555';
        ctx.fillRect(0,0,width,height);
        const cx = width/2;
        const cy = height/2;
        
        // Radial noise
        for(let r=0; r<width/2; r+=1) {
            const opacity = 0.05 + Math.random() * 0.1;
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI*2);
            ctx.stroke();
        }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
};

// HELPER: Gear Generator
const createGearGeometry = (radius: number, teeth: number, thickness: number = 0.1) => {
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = radius * 0.85;
    const holeRadius = radius * 0.15;
    const toothDepth = radius * 0.1;
    
    const step = (Math.PI * 2) / teeth;
    
    shape.moveTo(outerRadius, 0);
    
    for(let i=0; i<teeth; i++) {
        const angle = i * step;
        const nextAngle = (i+1) * step;
        const midAngle = angle + step/2;
        
        // Tooth Shape
        shape.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
        shape.lineTo(Math.cos(midAngle - 0.05) * (outerRadius - toothDepth), Math.sin(midAngle - 0.05) * (outerRadius - toothDepth));
        shape.lineTo(Math.cos(midAngle + 0.05) * (outerRadius - toothDepth), Math.sin(midAngle + 0.05) * (outerRadius - toothDepth));
        shape.lineTo(Math.cos(nextAngle) * outerRadius, Math.sin(nextAngle) * outerRadius);
    }
    
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, false);
    shape.holes.push(holePath);
    
    // Spokes cutouts (Skeleton Gear)
    if (radius > 0.5) {
        const spokeCount = 5;
        const spokeStart = holeRadius * 1.8;
        const spokeEnd = innerRadius * 0.7;
        const spokeStep = (Math.PI * 2) / spokeCount;
        
        for(let i=0; i<spokeCount; i++) {
            const angle = i * spokeStep;
            const cutout = new THREE.Path();
            const w = 0.15; // spoke width factor
            
            // Wedge shape cutout
            cutout.moveTo(Math.cos(angle + w) * spokeStart, Math.sin(angle + w) * spokeStart);
            cutout.lineTo(Math.cos(angle + w) * spokeEnd, Math.sin(angle + w) * spokeEnd);
            cutout.quadraticCurveTo(
                Math.cos(angle + spokeStep/2) * spokeEnd * 1.1, Math.sin(angle + spokeStep/2) * spokeEnd * 1.1,
                Math.cos(angle + spokeStep - w) * spokeEnd, Math.sin(angle + spokeStep - w) * spokeEnd
            );
            cutout.lineTo(Math.cos(angle + spokeStep - w) * spokeStart, Math.sin(angle + spokeStep - w) * spokeStart);
            cutout.quadraticCurveTo(
                Math.cos(angle + spokeStep/2) * spokeStart * 0.9, Math.sin(angle + spokeStep/2) * spokeStart * 0.9,
                Math.cos(angle + w) * spokeStart, Math.sin(angle + w) * spokeStart
            );
            
            shape.holes.push(cutout);
        }
    }

    return new THREE.ExtrudeGeometry(shape, {
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelSegments: 2
    });
};

const Tourbillon3D: React.FC<Tourbillon3DProps> = ({ onClose, featureId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  const isMovement = featureId === 'calibre';
  const title = isMovement ? "Architecture du Calibre" : "Tourbillon Volant";
  const subtitle = isMovement ? "Coeur Mécanique HL-09" : "Calibre HL-09";
  const description = isMovement 
    ? "Plongez au cœur du mouvement manufacture. Observez la cohérence de l'ensemble : barillet, trains de rouage et organe régulateur en parfaite harmonie." 
    : "Exploration virtuelle du Tourbillon Volant. Observez les finitions : Satinage, Perlage et Anglage sur la cage tournante.";

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 6, 18);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(isMovement ? 0 : 4, isMovement ? 6 : 3.5, isMovement ? 8 : 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- GENERATE TEXTURES ---
    const brushedMap = createBrushedTexture(1024, 1024);
    const perlageMap = createPerlageTexture(1024, 1024);
    const guillocheMap = createGuillocheTexture(1024, 1024);
    const polishedMap = createPolishedTexture(512, 512);
    const microGrainMap = createMicroGrainTexture(512, 512);
    const snailingMap = createSnailingTexture(512, 512);

    guillocheMap.repeat.set(3, 3);

    // --- MATERIALS ---
    const roseGoldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffb788, 
      metalness: 1.0,
      roughness: 0.12,
      roughnessMap: microGrainMap, 
      bumpMap: microGrainMap,
      bumpScale: 0.0001,
      clearcoat: 0.6,
      clearcoatRoughness: 0.05,
      envMapIntensity: 2.5,
    });

    const brassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffd700, // Gold/Brass gears
        metalness: 0.9,
        roughness: 0.3,
        roughnessMap: microGrainMap,
        envMapIntensity: 1.5
    });

    const rhodiumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdcdcdc, 
      metalness: 1.0,
      roughness: 0.45, 
      roughnessMap: brushedMap, 
      bumpMap: brushedMap, 
      bumpScale: 0.008, 
      clearcoat: 0.4, 
      envMapIntensity: 1.2 
    });

    const polishedSteelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x080808, 
      metalness: 1.0,
      roughness: 1.0, 
      roughnessMap: polishedMap, 
      clearcoat: 1.0,
      envMapIntensity: 5.0 
    });

    const bluedSteelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0033cc,
      metalness: 1.0,
      roughness: 1.0, 
      roughnessMap: polishedMap,
      clearcoat: 1.0,
      envMapIntensity: 4.0,
    });

    const jewelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb3002d,
      transmission: 0.8,
      opacity: 1,
      metalness: 0.0,
      roughness: 0.0,
      ior: 1.76,
      thickness: 1.0,
      clearcoat: 1.0,
    });

    const platformMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.95,
        roughness: 0.35,
        map: perlageMap,
        roughnessMap: perlageMap,
        bumpMap: perlageMap,
        bumpScale: 0.005,
        envMapIntensity: 1.2
    });

    const barrelMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.8,
        roughness: 0.4,
        map: snailingMap,
        roughnessMap: snailingMap,
        bumpMap: snailingMap,
        bumpScale: 0.002
    });

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.005);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xfff0e0, 1800);
    keyLight.position.set(6, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.bias = -0.00005;
    keyLight.shadow.mapSize.width = 4096; 
    keyLight.shadow.mapSize.height = 4096;
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0xaaddff, 300);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffaa00, 20);
    fillLight.position.set(3, -3, 3);
    scene.add(fillLight);

    // --- SCENE CONTENT CONSTRUCTION ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Animation Refs
    const gears: THREE.Mesh[] = [];
    let balanceWheelRef: THREE.Group | null = null;
    let spiralRef: THREE.Mesh | null = null;

    if (isMovement) {
        // === SCÈNE CALIBRE SQUELETTE SUISSE ===

        // 1. PLATINE PRINCIPALE (Skeleton Mainplate)
        const platineShape = new THREE.Shape();
        platineShape.absarc(0,0, 4.5, 0, Math.PI*2, false);
        
        // Trous de squelettage artistiques
        const cutout1 = new THREE.Path(); cutout1.absarc(2, 1.5, 1.2, 0, Math.PI*2, true); platineShape.holes.push(cutout1);
        const cutout2 = new THREE.Path(); cutout2.absarc(-2, 1.5, 1.0, 0, Math.PI*2, true); platineShape.holes.push(cutout2);
        const cutout3 = new THREE.Path(); cutout3.absarc(0, -2.2, 1.5, 0, Math.PI*2, true); platineShape.holes.push(cutout3);
        
        const platineGeo = new THREE.ExtrudeGeometry(platineShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4 });
        const platine = new THREE.Mesh(platineGeo, rhodiumMaterial); // Utiliser Rhodium ou une texture sablée noire
        platine.rotation.x = Math.PI / 2;
        platine.position.y = -0.5;
        platine.receiveShadow = true;
        platine.castShadow = true;
        rootGroup.add(platine);

        // 2. BARILLET (Barrel - Power Source)
        const barrelGeo = createGearGeometry(1.8, 72, 0.4);
        const barrel = new THREE.Mesh(barrelGeo, barrelMaterial);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(-1.8, 0.2, -1.5);
        barrel.castShadow = true;
        rootGroup.add(barrel);
        gears.push(barrel); // Animate slowly

        // Pont de Barillet
        const barrelBridgeShape = new THREE.Shape();
        barrelBridgeShape.moveTo(-0.5, -0.5);
        barrelBridgeShape.lineTo(2, -0.5);
        barrelBridgeShape.lineTo(2, 2);
        barrelBridgeShape.lineTo(-0.5, 2);
        barrelBridgeShape.holes.push(new THREE.Path().absarc(0.5, 0.5, 0.2, 0, Math.PI*2, true)); // Vis hole
        
        const barrelBridgeGeo = new THREE.ExtrudeGeometry(barrelBridgeShape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
        const barrelBridge = new THREE.Mesh(barrelBridgeGeo, rhodiumMaterial);
        barrelBridge.rotation.x = Math.PI / 2;
        barrelBridge.position.set(-2.5, 0.8, -2.0);
        barrelBridge.castShadow = true;
        rootGroup.add(barrelBridge);

        // Vis Bleuie sur pont de barillet
        const screw1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16), bluedSteelMaterial);
        screw1.position.set(-2.0, 0.9, -1.5);
        screw1.castShadow = true;
        rootGroup.add(screw1);


        // 3. TRAIN DE ROUAGE (Gear Train)
        
        // Roue de Centre (Center Wheel)
        const centerWheelGeo = createGearGeometry(1.2, 64, 0.08);
        const centerWheel = new THREE.Mesh(centerWheelGeo, brassMaterial);
        centerWheel.rotation.x = Math.PI / 2;
        centerWheel.position.set(0, 0.3, 0);
        centerWheel.castShadow = true;
        rootGroup.add(centerWheel);
        gears.push(centerWheel);

        // Roue Moyenne (Third Wheel)
        const thirdWheelGeo = createGearGeometry(0.9, 50, 0.08);
        const thirdWheel = new THREE.Mesh(thirdWheelGeo, brassMaterial);
        thirdWheel.rotation.x = Math.PI / 2;
        thirdWheel.position.set(1.8, 0.3, 0.5);
        thirdWheel.castShadow = true;
        rootGroup.add(thirdWheel);
        gears.push(thirdWheel);

        // Roue de Seconde (Fourth Wheel)
        const fourthWheelGeo = createGearGeometry(0.7, 40, 0.08);
        const fourthWheel = new THREE.Mesh(fourthWheelGeo, brassMaterial);
        fourthWheel.rotation.x = Math.PI / 2;
        fourthWheel.position.set(1.0, 0.3, 2.2);
        fourthWheel.castShadow = true;
        rootGroup.add(fourthWheel);
        gears.push(fourthWheel);


        // 4. PONTS DE ROUAGE (Squelette Bridges)
        const trainBridgeShape = new THREE.Shape();
        // Forme organique "Y" squelettée
        trainBridgeShape.moveTo(0,0);
        trainBridgeShape.bezierCurveTo(1, 0, 1.5, 0.5, 2, 1);
        trainBridgeShape.bezierCurveTo(2.5, 1.5, 3, 2, 2.5, 3);
        trainBridgeShape.lineTo(0.5, 3);
        trainBridgeShape.bezierCurveTo(0, 2, -0.5, 1, 0, 0);
        
        const trainBridgeGeo = new THREE.ExtrudeGeometry(trainBridgeShape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
        const trainBridge = new THREE.Mesh(trainBridgeGeo, rhodiumMaterial);
        trainBridge.rotation.x = Math.PI / 2;
        trainBridge.rotation.z = -Math.PI / 4;
        trainBridge.position.set(0.2, 0.6, -0.5);
        trainBridge.castShadow = true;
        trainBridge.receiveShadow = true;
        rootGroup.add(trainBridge);

        // Rubis (Jewels) sur les ponts
        const positions = [
            { x: 0, z: 0 }, // Center
            { x: 1.8, z: 0.5 }, // Third
            { x: 1.0, z: 2.2 } // Fourth
        ];

        positions.forEach(pos => {
            // Chaton Or
            const chaton = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16), brassMaterial);
            chaton.position.set(pos.x, 0.76, pos.z);
            chaton.castShadow = true;
            rootGroup.add(chaton);
            
            // Rubis
            const ruby = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.06, 16), jewelMaterial);
            ruby.position.set(pos.x, 0.77, pos.z);
            rootGroup.add(ruby);
        });

        // 5. BALANCIER (Balance Wheel - Simplified context)
        const balanceGroup = new THREE.Group();
        balanceGroup.position.set(-1.5, 0.3, 2.5);
        rootGroup.add(balanceGroup);
        balanceWheelRef = balanceGroup;

        const balanceRim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 16, 64), roseGoldMaterial);
        balanceRim.rotation.x = Math.PI/2;
        balanceGroup.add(balanceRim);
        const balanceSpoke = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 0.05), roseGoldMaterial);
        balanceSpoke.rotation.x = Math.PI/2;
        balanceGroup.add(balanceSpoke);

        // Spiral
        const springPoints = [];
        for (let i = 0; i < 200; i++) {
            const t = i / 15; 
            const radius = 0.1 + (i / 200) * 0.5;
            springPoints.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
        }
        const springCurve = new THREE.CatmullRomCurve3(springPoints);
        const spring = new THREE.Mesh(new THREE.TubeGeometry(springCurve, 100, 0.005, 8, false), bluedSteelMaterial);
        spring.position.y = 0.1;
        balanceGroup.add(spring);
        spiralRef = spring;

        // Coq (Balance Bridge)
        const coqShape = new THREE.Shape();
        coqShape.moveTo(0,0);
        coqShape.lineTo(1, 0);
        coqShape.lineTo(0.5, 1.5);
        coqShape.lineTo(-0.5, 1.5);
        const coqGeo = new THREE.ExtrudeGeometry(coqShape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
        const coq = new THREE.Mesh(coqGeo, rhodiumMaterial);
        coq.rotation.x = Math.PI/2;
        coq.rotation.z = Math.PI;
        coq.position.set(-1.5, 0.8, 3.5);
        coq.castShadow = true;
        rootGroup.add(coq);

        const coqRuby = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.06, 16), jewelMaterial);
        coqRuby.position.set(-1.5, 0.96, 2.5);
        rootGroup.add(coqRuby);


    } else {
        // === SCÈNE TOURBILLON (Code Original) ===
        const tourbillonGroup = new THREE.Group();
        rootGroup.add(tourbillonGroup);

        // 1. Base Platform (Perlage)
        const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.0, 0.1, 64), platformMaterial);
        platform.position.y = -1.6;
        platform.receiveShadow = true;
        tourbillonGroup.add(platform);

        // 2. Guilloché Ring
        const ringGeo = new THREE.TorusGeometry(2.4, 0.35, 32, 128);
        const ring = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({
            color: 0xf8f8f8,
            metalness: 0.9,
            roughness: 0.2,
            map: guillocheMap,
            bumpMap: guillocheMap,
            bumpScale: 0.03,
            envMapIntensity: 1.5
        }));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -1.55;
        ring.receiveShadow = true;
        tourbillonGroup.add(ring);

        // --- ROTATING CAGE ---
        const cageGroup = new THREE.Group();
        tourbillonGroup.add(cageGroup);
        // Stocker ref pour animation dans un tableau ou ref simple si besoin, 
        // ici on réutilise la logique d'animation existante mais adaptée.
        // Pour simplifier la séparation, j'intègre la construction ici.

        // Cage Base
        const cageBase = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.05, 64), rhodiumMaterial);
        cageBase.castShadow = true;
        cageBase.receiveShadow = true;
        cageGroup.add(cageBase);

        // Piliers
        const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.85, 32);
        [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach(angle => {
            const pillar = new THREE.Mesh(pillarGeo, polishedSteelMaterial);
            pillar.position.set(Math.cos(angle) * 1.1, 0.425, Math.sin(angle) * 1.1);
            pillar.castShadow = true;
            cageGroup.add(pillar);
        });

        // Pont Supérieur
        const topBridgeGroup = new THREE.Group();
        topBridgeGroup.position.y = 0.85;
        [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach(angle => {
            const arm = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.06, 0.18), rhodiumMaterial);
            arm.position.set(Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55);
            arm.rotation.y = -angle;
            arm.castShadow = true;
            topBridgeGroup.add(arm);
            
            const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 16), bluedSteelMaterial);
            screw.position.set(Math.cos(angle) * 1.0, 0.04, Math.sin(angle) * 1.0);
            screw.rotation.y = -angle;
            screw.castShadow = true;
            topBridgeGroup.add(screw);
        });
        const centerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 32), polishedSteelMaterial);
        centerHub.castShadow = true;
        topBridgeGroup.add(centerHub);
        cageGroup.add(topBridgeGroup);

        const topRuby = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16), jewelMaterial);
        topRuby.position.y = 0.88;
        cageGroup.add(topRuby);

        // Balance
        const balanceGroupLocal = new THREE.Group();
        balanceGroupLocal.position.y = 0.4;
        cageGroup.add(balanceGroupLocal);
        balanceWheelRef = balanceGroupLocal;

        const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.05, 16, 128), roseGoldMaterial);
        balanceGroupLocal.add(wheelRim);
        const wheelSpokeGeo = new THREE.BoxGeometry(1.95, 0.04, 0.05);
        balanceGroupLocal.add(new THREE.Mesh(wheelSpokeGeo, roseGoldMaterial));
        const s2 = new THREE.Mesh(wheelSpokeGeo, roseGoldMaterial); s2.rotation.y = Math.PI/2; balanceGroupLocal.add(s2);
        
        // Spiral
        const sprPoints = [];
        for (let i = 0; i < 280; i++) {
            const t = i / 14; const r = 0.12 + (i / 280) * 0.65;
            sprPoints.push(new THREE.Vector3(Math.cos(t) * r, (i/280)*0.05, Math.sin(t) * r));
        }
        const spr = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sprPoints), 140, 0.006, 8, false), bluedSteelMaterial);
        spr.position.y = 0.08;
        balanceGroupLocal.add(spr);
        spiralRef = spr;

        // Animer la cage complète
        gears.push(cageGroup as any); // Hack pour l'animation loop générique
    }

    // --- PARTICLES ---
    const particleCount = 1500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 25;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleSystem = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.03, transparent: true, opacity: 0.4, sizeAttenuation: true, blending: THREE.AdditiveBlending
    }));
    scene.add(particleSystem);

    // --- ANIMATION LOOP ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const clock = new THREE.Clock();

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (isMovement) {
        // Animation Calibre
        gears.forEach((gear, index) => {
            // Gear ratios simulation
            const speed = index === 0 ? 0.2 : (index + 1) * 0.5; 
            const dir = index % 2 === 0 ? 1 : -1;
            gear.rotation.z = time * speed * dir;
        });

        if (balanceWheelRef) {
            balanceWheelRef.rotation.z = Math.sin(time * 6) * 2.5; // Oscillation
        }
        if (spiralRef) {
            const breathing = 1 + Math.sin(time * 12) * 0.04;
            spiralRef.scale.set(breathing, 1, breathing);
        }

      } else {
        // Animation Tourbillon
        if (gears.length > 0) {
             gears[0].rotation.y = -time * 0.4; // Cage rotation
        }
        if (balanceWheelRef) {
            balanceWheelRef.rotation.y = Math.sin(time * 6) * 2.5;
        }
        if (spiralRef) {
            const breathing = 1 + Math.sin(time * 12) * 0.04;
            spiralRef.scale.set(breathing, 1, breathing);
        }
      }

      particleSystem.rotation.y = time * 0.02;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        containerRef.current?.removeChild(rendererRef.current.domElement);
      }
      brushedMap.dispose();
      perlageMap.dispose();
      guillocheMap.dispose();
      polishedMap.dispose();
      microGrainMap.dispose();
      snailingMap.dispose();
    };
  }, [featureId, isMovement]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-50 p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors border border-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="absolute top-8 left-8 z-40 text-white pointer-events-none">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-[1px] bg-gold-500"></div>
             <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold">Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-2">{subtitle}</h2>
          <h3 className="text-lg font-light text-white/80 mb-2">{title}</h3>
          <p className="text-neutral-400 text-sm font-light tracking-wide max-w-md">
            {description}
          </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 text-neutral-500 pointer-events-none opacity-60">
          <MousePointer2 className="w-5 h-5 animate-bounce text-gold-500" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Rotation Interactive</span>
      </div>

      <div ref={containerRef} className="w-full h-full cursor-move" />
    </div>
  );
};

export default Tourbillon3D;
