// src/app/pratique/calibre-3d/calibre3dEngine.ts
/**
 * Master Calibre 3D ETA 6497-1 (Unitas 16 1/2''') Procedural WebGL Engine
 * Authentic Swiss Haute Horlogerie Kinematic Simulation & 360° Quaternion Trackball
 * Strict TypeScript implementation for HorloLearn.ch
 */
import * as THREE from 'three';

export interface OrganData {
    id: string;
    category: string;
    title: string;
    gearBadge: string;
    description: string;
    speed: string;
    oil: string;
    oiler: string;
    endshake: string;
    examTrap: string;
    focusOffset: { x: number; y: number; z: number };
    zoomDist: number;
}

export const ORGAN_DATABASE: Record<string, OrganData> = {
            barrel: {
                id: 'barrel',
                category: '01. ORGANE MOTEUR • ACCUMULATEUR D\'ÉNERGIE',
                title: '01. Barillet, Ressort Nivaflex & Rochet (à 1h30)',
                gearBadge: 'Z = 84 dents',
                description: 'Tambour denté (Z=84) contenant le ressort-moteur en alliage Nivaflex. Sur le calibre à remontage manuel ETA 6497-1, l\'extrémité externe du ressort se termine par un crochet rivé qui s\'ancre dans une encoche franche du tambour (pas de bride glissante).',
                speed: '0.143 tr/h (1 tr / 7h)',
                oil: 'Moebius HP-1300 (Arbre)',
                oiler: 'Huilier Bleu (Ø 0.18 mm)',
                endshake: '0.025 à 0.045 mm',
                examTrap: 'PIÈGE ÉLIMINATOIRE : Toujours désarmer le ressort de barillet (en tenant la couronne et en écartant le cliquet) avant de dévisser le pont de barillet ! Vis de roue de couronne à PAS GAUCHE (fente double/repérée).',
                focusOffset: { x: -4.5, y: -0.5, z: 3.2 },
                zoomDist: 12.5
            },
            centerWheel: {
                id: 'centerWheel',
                category: '02. ROUAGE DE TRANSMISSION • 1er MOBILE',
                title: '02. Roue de Centre & Chaussée (Centre 0,0)',
                gearBadge: 'Z = 64 / z = 12',
                description: 'Placée exactement au centre géométrique de la platine, son pignon (z = 12 ailes) est entraîné par les 84 dents du barillet. Son axe traverse la platine pour recevoir la chaussée à friction qui porte l\'aiguille des minutes.',
                speed: '1.00 tour / heure exact',
                oil: 'Moebius HP-1300 / D5',
                oiler: 'Huilier Rouge / Bleu',
                endshake: '0.020 à 0.035 mm',
                examTrap: 'Lubrifier les paliers rubis à la HP-1300. Vérifier le couple de friction de la chaussée : ni trop lâche (décalage des aiguilles), ni trop dur (risque de bris de denture de minuterie).',
                focusOffset: { x: 0, y: -0.4, z: 0 },
                zoomDist: 12.0
            },
            thirdWheel: {
                id: 'thirdWheel',
                category: '03. ROUAGE DE TRANSMISSION • 2e MOBILE',
                title: '03. Roue de Moyenne (Positionnée à 11h)',
                gearBadge: 'Z = 60 / z = 8',
                description: 'Mobile intermédiaire en laiton doré à 5 bras reliant la roue de centre (64 dents → pignon 8 ailes, rapport 8:1) au pignon de la roue de seconde située à 9h.',
                speed: '8.00 tours / heure',
                oil: 'Moebius HP-1300',
                oiler: 'Huilier Rouge (Ø 0.12 mm)',
                endshake: '0.020 à 0.035 mm',
                examTrap: 'Lors de la pose du grand pont de rouage du 6497-1, engager délicatement le pivot de moyenne sans forcer avec la brucelle : un pivot faussé bloque toute la chaîne cinématique.',
                focusOffset: { x: 3.2, y: -0.6, z: 2.8 },
                zoomDist: 11.5
            },
            fourthWheel: {
                id: 'fourthWheel',
                category: '04. ROUAGE DE FINISSAGE • PETITE SECONDE 9H',
                title: '04. Roue de Seconde à 9h (Signature Unitas 6497-1)',
                gearBadge: 'Z = 60 / z = 8',
                description: 'Caractéristique des calibres de poche Lépine (tige à 3h, petite seconde à 9h). Elle effectue exactement 1 tour par minute et possède un long pivot inférieur traversant le cadran à 9h pour porter la trotteuse.',
                speed: '60 tours / heure (1 tr/min)',
                oil: 'Moebius 9010 (Huile fine)',
                oiler: 'Huilier Noir (Ø 0.08 mm)',
                endshake: '0.015 à 0.030 mm',
                examTrap: 'Transition de viscosité : à partir de la roue de seconde, la vitesse augmente et le couple diminue → on passe impérativement de la HP-1300 à l\'huile synthétique fine Moebius 9010 !',
                focusOffset: { x: 5.4, y: -0.5, z: -0.2 },
                zoomDist: 11.5
            },
            escapeWheel: {
                id: 'escapeWheel',
                category: '05. DISTRIBUTEUR D\'ÉNERGIE • ROUAGE RAPIDE',
                title: '05. Mobile d\'Échappement en Acier (15 Dents en Club)',
                gearBadge: 'Z = 15 / z = 6',
                description: 'Roue en acier poli à 15 dents asymétriques à profil « club » (talon dégagé, plan de repos et plan d\'impulsion partagé avec les palettes d\'ancre). Son pignon à 6 ailes est entraîné par les 60 dents de la roue de seconde (rapport 10:1 → 1 tour en 6 secondes).',
                speed: '600 tr/h (1 tour / 6 sec)',
                oil: 'Pivots: 9010 | Dents: 9415',
                oiler: 'Huilier Noir (Ø 0.08 mm)',
                endshake: '0.015 à 0.025 mm',
                examTrap: 'Ne jamais toucher les dents traitées à l\'épilame (Fixodrop) avec des brucelles grasses. Une infime trace de doigt détruit la tension superficielle et fait fuir la Moebius 9415.',
                focusOffset: { x: 2.8, y: -0.4, z: -3.9 },
                zoomDist: 8.5
            },
            palletFork: {
                id: 'palletFork',
                category: '06. ÉCHAPPEMENT À ANCRE SUISSE • 5 PHASES',
                title: '06. Ancre Suisse 3D, Palettes Rubis, Fourchette & Dard',
                gearBadge: 'Tirage 12° • 2 Palettes',
                description: 'Ancre suisse usinée avec bras coudés, palettes d\'entrée et de sortie en rubis corindon synthétique, baguette, cornes de fourchette, dard de sécurité et goupilles de limitation.',
                speed: '18\'000 basculements / heure',
                oil: 'Palettes : Moebius 9415 SEULE',
                oiler: 'Pique-huile Rouge (Palettes)',
                endshake: '0.015 à 0.025 mm',
                examTrap: 'INTERDICTION ABSOLUE (Zéro tolérance) : Les pivots d\'ancre, la fourchette et le dard ne doivent JAMAIS être huilés ! Seuls les plans d\'impulsion des palettes reçoivent de la Moebius 9415.',
                focusOffset: { x: 0.6, y: -0.4, z: -4.2 },
                zoomDist: 7.8
            },
            balance: {
                id: 'balance',
                category: '07. ORGANE RÉGULATEUR • OSCILLATEUR 2.5 HZ',
                title: '07. Balancier Glucydur, Double Plateau, Ellipse & Coq',
                gearBadge: '18\'000 A/h (44°)',
                description: 'Cœur chronométrique du calibre 6497-1 battant à 18\'000 alternances/heure (200 ms). Doté d\'un balancier annulaire à 16 vis d\'équilibrage, d\'un double plateau (ellipse rubis + petit plateau à encoche face au dard) et d\'un coq sculpté avec raquette et Incabloc.',
                speed: '5 alternances / sec (2.5 Hz)',
                oil: 'Contre-pivots : Moebius 9010',
                oiler: 'Huilier Noir (Ø 0.08 mm)',
                endshake: '0.015 à 0.025 mm',
                examTrap: 'Sur le chrono-comparateur Witschi, toujours paramétrer l\'angle de levée du 6497-1 sur 44° (et non 50° ou 52° !), sinon l\'amplitude affichée sera faussée de +35°.',
                focusOffset: { x: -2.8, y: -0.6, z: -3.6 },
                zoomDist: 9.8
            },
            winding: {
                id: 'winding',
                category: '08. REMONTOIR & MISE À L\'HEURE • TIGE À 3H',
                title: '08. Tige de Remontoir, Pignon Coulant, Tirette & Bascule',
                gearBadge: 'Denture Breguet',
                description: 'Mécanisme commandé par la couronne à 3h. En position 1 (poussée), le pignon coulant engrène par sa denture loup (Breguet) avec le pignon de remontoir pour armer la roue de couronne et le rochet. En position 2 (tirée), il règle l\'heure.',
                speed: 'Actionné manuellement',
                oil: 'Graisse Moebius 8200 / DX',
                oiler: 'Huilier Vert (Ø 0.25 mm)',
                endshake: 'Jeu de tige : 0.15 mm',
                examTrap: 'La vis de la roue de couronne (2 fentes) possède un FILETAGE À GAUCHE : on la dévisse dans le sens horaire ! Forcer en sens anti-horaire brise la tête de vis dans le pont de barillet.',
                focusOffset: { x: -6.8, y: -0.3, z: 0 },
                zoomDist: 11.5
            },
            dial: {
                id: 'dial',
                category: '09. AFFICHAGE & HABILLAGE • CADRAN LÉPINE',
                title: '09. Cadran Soleillé Anthracite, Petite Seconde 9h & Quantième',
                gearBadge: 'Minuterie 12:1',
                description: 'Côté cadran du calibre 6497-1 Lépine (tige à 3h et petite seconde à 9h alignées). La chaussée (sur la roue de centre) entraîne la roue de minuterie et la roue des heures (démultiplication 12:1) sous des aiguilles facettées Dauphine.',
                speed: 'Heures : 2 tr/j • Min : 24 tr/j',
                oil: 'Chaussée : Graisse Moebius 8200',
                oiler: 'Huilier Vert (Ø 0.25 mm)',
                endshake: 'Liberté des aiguilles : ~0.15 mm',
                examTrap: 'Toujours poser une feuille de protection plastique avant d\'utiliser les leviers aux aiguilles. Vérifier le parallélisme des aiguilles en vue de profil sur 360°.',
                focusOffset: { x: 0, y: 0.6, z: 0 },
                zoomDist: 19.5
            }
        }

export interface Calibre3DEngineCallbacks {
    onOrganSelect?: (organ: OrganData) => void;
    onPhaseChange?: (phaseTag: string, phaseDesc: string) => void;
    onBeatUpdate?: (beatPct: number) => void;
    onDialSideToggle?: (isDial: boolean) => void;
    onAmplitudeChange?: (amp: number, torque: number) => void;
}

export interface Calibre3DController {
    setCameraPreset: (preset: 'iso' | 'topBridges' | 'dial' | 'escapement' | 'balanceMacro' | 'profile') => void;
    selectOrgan: (organId: string) => void;
    focusSelectedOrganCamera: () => void;
    flipCalibre180: () => boolean;
    setSimSpeed: (speed: number) => void;
    scrubBeat: (val: number) => void;
    setExplode: (val: number) => void;
    setXray: (val: number) => void;
    setMainspring: (val: number) => void;
    windCrownStep: () => void;
    nudgeTrackball: (deltaPitchX: number, deltaYawY: number) => void;
    toggleAudio: () => boolean;
    dispose: () => void;
}

export function initCalibre3DEngine(container: HTMLElement, callbacks: Calibre3DEngineCallbacks): Calibre3DController {
    let isDisposed = false;
    let animFrameId: number;

;

        /**
         * 2. GLOBAL SIMULATION STATE
         */
        const simState = {
            speedMultiplier: 1.0,
            beatPhasePct: 45,
            beatDirection: 1,
            totalEscapeTeethPassed: 0,
            explodeFactor: 0,
            xrayFactor: 0.25,
            mainspringCharge: 85,
            selectedOrgan: 'barrel',
            audioEnabled: false,
            isDialSideShown: false
        };

        /**
         * 3. WEB AUDIO API MECHANICAL TICK-TOCK SYNTHESIZER (5 Hz = 18'000 A/h)
         */
        let audioCtx: any = null;

        function toggleAudioTick() {
            simState.audioEnabled = !simState.audioEnabled;
            if (simState.audioEnabled && !audioCtx) {
                const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) audioCtx = new AudioContextClass();
            }
            return simState.audioEnabled;
        }

        function playMechanicalAcousticImpulse(type: string) {
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
            } catch (e) {}
        }

        /**
         * 4. THREE.JS 3D PROCEDURAL CALIBRE ETA 6497-1 ENGINE + QUATERNION TRACKBALL
         */
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let calibreWorld: THREE.Group;
        let calibrePivot: THREE.Group;
        const layerGroups: THREE.Group[] = [];
        const organMeshes: Record<string, THREE.Object3D> = {};
        const bridgeMaterials: THREE.MeshStandardMaterial[] = [];

        // Animated 3D references
        let meshBarrel: THREE.Mesh | undefined;
        let meshMainspringSpiral: THREE.Line | undefined;
        let meshRatchetWheel: THREE.Mesh | undefined;
        let meshCrownWheel: THREE.Mesh | undefined;
        let meshCenterWheel: THREE.Mesh | undefined;
        let meshThirdWheel: THREE.Mesh | undefined;
        let meshFourthWheel: THREE.Mesh | undefined;
        let meshEscapeWheel: THREE.Mesh | undefined;
        let meshPalletFork: THREE.Mesh | undefined;
        let meshBalanceWheel: THREE.Mesh | undefined;
        let meshHairspring: THREE.Line | undefined;
        let meshWindingCrown: THREE.Mesh | undefined;
        let meshHourHand: THREE.Mesh | undefined;
        let meshMinuteHand: THREE.Mesh | undefined;
        let meshSmallSecondsHand: THREE.Mesh | undefined;

        /**
         * GIMBAL-LOCK-FREE QUATERNION TRACKBALL CONTROLLER
         * Allows turning the watch movement effortlessly in ANY 360° direction without pole lock or flip!
         */
        const trackball = {
            currentQuat: new THREE.Quaternion(),
            targetQuat: new THREE.Quaternion(),
            currentPivot: new THREE.Vector3(0, 0, 0),
            targetPivot: new THREE.Vector3(0, 0, 0),
            currentZoom: 21.0,
            targetZoom: 21.0,
            isDragging: false,
            isPanning: false,
            prevX: 0,
            prevY: 0,
            velX: 0,
            velY: 0,
            pinchStartDist: 0
        };

        function setTrackballEuler(rx: number, ry: number, rz: number = 0) {
            trackball.velX = 0;
            trackball.velY = 0;
            trackball.targetQuat.setFromEuler(new THREE.Euler(rx, ry, rz, 'XYZ'));
        }

        function nudgeTrackball(deltaPitchX: number, deltaYawY: number) {
            trackball.velX = 0;
            trackball.velY = 0;
            const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), deltaPitchX);
            const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), deltaYawY);
            trackball.targetQuat.premultiply(qy).premultiply(qx).normalize();
        }

        function flipCalibre180() {
            const qFlip = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
            trackball.targetQuat.premultiply(qFlip).normalize();
            simState.isDialSideShown = !simState.isDialSideShown;
        }

        /**
         * Procedural 3D Spoked Gear Generator with Beveled Rims & Authentic Club Teeth
         */
        function createProceduralGearMesh(outerRadius: number, innerRadius: number, teethCount: number, thickness: number, material: THREE.Material, spokeCount: number = 5, clubTeeth: boolean = false): THREE.Mesh {
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
                bevelThickness: 0.02
            };

            const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geom.rotateX(Math.PI / 2);
            geom.translate(0, thickness / 2, 0);
            return new THREE.Mesh(geom, material);
        }

        function createRubyJewelUnit(radius: number = 0.34, withIncabloc: boolean = false, matRuby?: THREE.Material, matGold?: THREE.Material): THREE.Group {
            const group = new THREE.Group();
            const chaton = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.25, radius * 1.25, 0.14, 24), matGold);
            const ruby = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.18, 24), matRuby);
            group.add(chaton, ruby);

            if (withIncabloc) {
                const lyreRing = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.15, 0.045, 8, 24), matGold);
                lyreRing.rotation.x = Math.PI / 2;
                lyreRing.position.y = 0.1;
                group.add(lyreRing);
            }
            return group;
        }

        function createBluedScrew(x: number, y: number, z: number, matBlued: THREE.Material, leftHandSlot: boolean = false): THREE.Mesh {
            const grp = new THREE.Group();
            grp.position.set(x, y, z);
            const head = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.12, 20), matBlued);
            const slotMat = new THREE.MeshBasicMaterial({ color: 0x05070B });
            const slot1 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.05), slotMat);
            slot1.position.y = 0.05;
            grp.add(head, slot1);

            if (leftHandSlot) {
                const slot2 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.05), slotMat);
                slot2.position.set(0, 0.05, 0.1);
                grp.add(slot2);
            }
            return grp;
        }

        /**
         * Procedural Dial, Date Disc, Faceted Hands & Côtes de Genève Generators
         */
        function createModernDialTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            const cx = 512, cy = 512;

            const dialGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 510);
            dialGrad.addColorStop(0, '#222936');
            dialGrad.addColorStop(0.5, '#141822');
            dialGrad.addColorStop(0.85, '#0D1017');
            dialGrad.addColorStop(1, '#06080C');
            ctx.fillStyle = dialGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 510, 0, Math.PI * 2);
            ctx.fill();

            ctx.lineWidth = 1;
            for (let i = 0; i < 360; i += 1.5) {
                const rad = (i * Math.PI) / 180;
                const alpha = 0.025 + (Math.sin(rad * 8) * 0.5 + 0.5) * 0.035;
                ctx.strokeStyle = `rgba(225, 238, 255, ${alpha.toFixed(3)})`;
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

            const subX = 189, subY = 524, subR = 125;
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
            return tex;
        }

        function createDateDiscTexture(dayNumber: number): THREE.CanvasTexture {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');

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

            return new THREE.CanvasTexture(canvas);
        }

        function createFacetedHandGeom(length: number, baseW: number, tipW: number, ridgeH: number): THREE.BufferGeometry {
            const geom = new THREE.BufferGeometry();
            const verts = new Float32Array([
                0, -ridgeH, 0,
                -baseW / 2, 0, 0,
                -tipW / 2, 0, length,
                0, -ridgeH * 0.35, length + 0.22,
                0, -ridgeH, 0,
                0, -ridgeH * 0.35, length + 0.22,
                tipW / 2, 0, length,
                baseW / 2, 0, 0
            ]);
            const indices = [
                0, 2, 1,   0, 3, 2,
                4, 6, 5,   4, 7, 6
            ];
            geom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
            geom.setIndex(indices);
            geom.computeVertexNormals();
            return geom;
        }

        function createCotesDeGeneveTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#CBD5E1';
            ctx.fillRect(0, 0, 1024, 1024);

            const stripeW = 56;
            for (let x = 0; x < 1024; x += stripeW) {
                const isOdd = Math.floor(x / stripeW) % 2 === 1;
                const g = ctx.createLinearGradient(x, 0, x + stripeW, 0);
                if (isOdd) {
                    g.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
                    g.addColorStop(0.5, 'rgba(235, 242, 250, 0.18)');
                    g.addColorStop(1, 'rgba(130, 145, 165, 0.35)');
                } else {
                    g.addColorStop(0, 'rgba(120, 135, 155, 0.32)');
                    g.addColorStop(0.5, 'rgba(255, 255, 255, 0.42)');
                    g.addColorStop(1, 'rgba(195, 210, 225, 0.15)');
                }
                ctx.fillStyle = g;
                ctx.fillRect(x, 0, stripeW, 1024);

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
                ctx.lineWidth = 1;
                for (let y = 0; y < 1024; y += 8) {
                    ctx.beginPath();
                    ctx.arc(x + stripeW / 2, y + 28, stripeW * 0.88, Math.PI * 0.82, Math.PI * 0.18, true);
                    ctx.stroke();
                }
            }

            const tex = new THREE.CanvasTexture(canvas);
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(1.4, 1.4);
            return tex;
        }

        function createBridgeChaton(x: number, z: number, rChaton: number = 0.58, rRuby: number = 0.30, matBrightGold?: THREE.Material, matRuby?: THREE.Material): THREE.Group {
            const chatonGrp = new THREE.Group();
            chatonGrp.position.set(x, 0.25, z);

            const chatonGeom = new THREE.CylinderGeometry(rChaton, rChaton * 0.92, 0.09, 32);
            const chatonMesh = new THREE.Mesh(chatonGeom, matBrightGold);

            const rubyGeom = new THREE.CylinderGeometry(rRuby, rRuby, 0.11, 24);
            const rubyMesh = new THREE.Mesh(rubyGeom, matRuby);
            rubyMesh.position.y = 0.01;

            const oilSinkGeom = new THREE.CylinderGeometry(rRuby * 0.38, rRuby * 0.18, 0.06, 16);
            const oilSinkMesh = new THREE.Mesh(oilSinkGeom, new THREE.MeshBasicMaterial({ color: 0x2A050A }));
            oilSinkMesh.position.y = 0.045;

            chatonGrp.add(chatonMesh, rubyMesh, oilSinkMesh);
            return chatonGrp;
        }

        function initThreeCalibre6497() {
            // container passed as argument
            const w = container.clientWidth || 800;
            const h = container.clientHeight || 560;

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 200);
            camera.position.set(0, 0, trackball.currentZoom);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            container.innerHTML = '';
            container.appendChild(renderer.domElement);

            // Studio Horological Lighting (Balanced top & bottom for seamless 360° flipping)
            const ambient = new THREE.AmbientLight(0xD8E2F2, 0.78);
            scene.add(ambient);

            const keyLight = new THREE.DirectionalLight(0xFFF6E0, 1.35);
            keyLight.position.set(14, 22, 18);
            scene.add(keyLight);

            const rimLight = new THREE.DirectionalLight(0x38BDF8, 0.65);
            rimLight.position.set(-16, 12, 14);
            scene.add(rimLight);

            const dialSideLight = new THREE.DirectionalLight(0xFFFBEB, 0.75);
            dialSideLight.position.set(8, -18, 16);
            scene.add(dialSideLight);

            // Horological Materials
            const matPlatine = new THREE.MeshStandardMaterial({ color: 0x64748B, metalness: 0.78, roughness: 0.32 });
            const matBrassGold = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.86, roughness: 0.22 });
            const matBrightGold = new THREE.MeshStandardMaterial({ color: 0xF3E5AB, metalness: 0.9, roughness: 0.18 });
            const matPolishedSteel = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, metalness: 0.92, roughness: 0.15 });
            const matDarkSteel = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.28 });
            const matBluedSteel = new THREE.MeshStandardMaterial({ color: 0x2563EB, metalness: 0.85, roughness: 0.2 });
            const matNivaflex = new THREE.MeshStandardMaterial({ color: 0x38BDF8, metalness: 0.8, roughness: 0.25 });
            const matRuby = new THREE.MeshStandardMaterial({
                color: 0xE11D48,
                emissive: 0x4C0519,
                metalness: 0.2,
                roughness: 0.1,
                transparent: true,
                opacity: 0.92
            });

            const cotesTexture = createCotesDeGeneveTexture();
            const createBridgeMat = (hexColor = 0xD8E0E8) => {
                const m = new THREE.MeshStandardMaterial({
                    color: hexColor,
                    map: cotesTexture,
                    bumpMap: cotesTexture,
                    bumpScale: 0.016,
                    metalness: 0.86,
                    roughness: 0.24,
                    transparent: true,
                    opacity: 1 - simState.xrayFactor
                });
                bridgeMaterials.push(m);
                return m;
            };

            // Initialize Quaternion Trackball Hierarchy:
            // scene -> calibreWorld (rotates 360° via Quaternion) -> calibrePivot (centers zoomed organ) -> 7 layerGroups
            calibreWorld = new THREE.Group();
            calibrePivot = new THREE.Group();
            calibreWorld.add(calibrePivot);
            scene.add(calibreWorld);

            // Default Isometric 3D Tilt on Movement Bridges
            setTrackballEuler(0.88, -0.38, 0);
            trackball.currentQuat.copy(trackball.targetQuat);
            calibreWorld.quaternion.copy(trackball.currentQuat);

            for (let i = 0; i < 7; i++) {
                const lg = new THREE.Group();
                lg.userData.layerIndex = i;
                calibrePivot.add(lg);
                layerGroups.push(lg);
            }

            // =========================================================================
            // LAYER 0 : PLATINE, CADRAN MODERNE SOLEILLÉ, GUICHET DATE & AIGUILLES
            // =========================================================================
            const platineGrp = new THREE.Group();

            // 1. Platine Principale (Mainplate with Perlage Rim)
            const mainPlate = new THREE.Mesh(new THREE.CylinderGeometry(8.6, 8.6, 0.35, 64), matPlatine);
            mainPlate.position.y = -0.35;
            platineGrp.add(mainPlate);

            // Case Clamps & Screws (Brides d'emboîtage à 5h et 11h)
            [-2.4, 0.7].forEach(ang => {
                const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.35), matPolishedSteel);
                clamp.position.set(Math.cos(ang) * 8.55, -0.15, Math.sin(ang) * 8.55);
                clamp.rotation.y = -ang;
                platineGrp.add(clamp);
            });

            // Outer Gold Bezel Reference Ring
            const bezelRing = new THREE.Mesh(new THREE.TorusGeometry(8.65, 0.08, 12, 64), matBrassGold);
            bezelRing.rotation.x = Math.PI / 2;
            bezelRing.position.y = -0.18;
            platineGrp.add(bezelRing);

            // 2. Cadran Moderne Soleillé (Y = -0.53)
            const dialTexture = createModernDialTexture();
            const matDial = new THREE.MeshStandardMaterial({
                map: dialTexture,
                roughness: 0.35,
                metalness: 0.65
            });
            const dialMesh = new THREE.Mesh(new THREE.CircleGeometry(8.55, 64), matDial);
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
            const fw = 0.80, fh = 0.60;
            dateFrameShape.moveTo(-fw, -fh);
            dateFrameShape.lineTo(fw, -fh);
            dateFrameShape.lineTo(fw, fh);
            dateFrameShape.lineTo(-fw, fh);
            dateFrameShape.closePath();

            const dateHole = new THREE.Path();
            const hw = 0.58, hh = 0.40;
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
                bevelSegments: 3
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
                color: 0xEEFFF4,
                emissive: 0x1A4428,
                emissiveIntensity: 0.45,
                roughness: 0.5
            });

            for (let h = 1; h <= 12; h++) {
                const alpha = (h / 12) * Math.PI * 2;
                const rIdx = 7.1;
                const ix = Math.sin(alpha) * rIdx;
                const iz = Math.cos(alpha) * rIdx;

                if (h === 12) {
                    [-0.18, 0.18].forEach(offset => {
                        const baton = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 1.15), matPolishedSteel);
                        baton.position.set(offset, -0.56, 7.1);
                        const lumi = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.82), matLumi);
                        lumi.position.set(offset, -0.596, 7.1);
                        indicesGrp.add(baton, lumi);
                    });
                } else if (h === 3) {
                    const batonGrp = new THREE.Group();
                    batonGrp.position.set(7.05, -0.56, 0.0);
                    batonGrp.rotation.y = Math.PI / 2;
                    const baton = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.65), matPolishedSteel);
                    const lumi = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.42), matLumi);
                    lumi.position.y = -0.036;
                    batonGrp.add(baton, lumi);
                    indicesGrp.add(batonGrp);
                } else if (h === 9) {
                    const batonGrp = new THREE.Group();
                    batonGrp.position.set(-7.4, -0.56, 0.0);
                    batonGrp.rotation.y = Math.PI / 2;
                    const baton = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.55), matPolishedSteel);
                    const lumi = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.35), matLumi);
                    lumi.position.y = -0.036;
                    batonGrp.add(baton, lumi);
                    indicesGrp.add(batonGrp);
                } else {
                    const batonGrp = new THREE.Group();
                    batonGrp.position.set(ix, -0.56, iz);
                    batonGrp.rotation.y = alpha;

                    const baton = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.07, 1.15), matPolishedSteel);
                    const lumi = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.80), matLumi);
                    lumi.position.y = -0.036;
                    batonGrp.add(baton, lumi);
                    indicesGrp.add(batonGrp);
                }
            }
            platineGrp.add(indicesGrp);

            // 5. Aiguilles Modernes Facettées Dauphine-Bâton (Heures & Minutes)
            const handsCenterGrp = new THREE.Group();
            handsCenterGrp.position.set(0, 0, 0);

            meshHourHand = new THREE.Group();
            meshHourHand.position.set(0, -0.63, 0);
            const hourBladeGeom = createFacetedHandGeom(4.4, 0.48, 0.16, 0.08);
            const hourBladeMesh = new THREE.Mesh(hourBladeGeom, matPolishedSteel);
            const hourCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.06, 24), matPolishedSteel);
            const hourLumi = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.02, 2.8), matLumi);
            hourLumi.position.set(0, -0.045, 2.2);
            meshHourHand.add(hourBladeMesh, hourCollar, hourLumi);
            handsCenterGrp.add(meshHourHand);

            meshMinuteHand = new THREE.Group();
            meshMinuteHand.position.set(0, -0.71, 0);
            const minBladeGeom = createFacetedHandGeom(6.85, 0.42, 0.12, 0.08);
            const minBladeMesh = new THREE.Mesh(minBladeGeom, matPolishedSteel);
            const minCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 24), matPolishedSteel);
            const minLumi = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 4.6), matLumi);
            minLumi.position.set(0, -0.045, 3.5);
            meshMinuteHand.add(minBladeMesh, minCollar, minLumi);
            handsCenterGrp.add(meshMinuteHand);

            const centerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.10, 24), matPolishedSteel);
            centerCap.position.set(0, -0.76, 0);
            const centerCapDome = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), matPolishedSteel);
            centerCapDome.rotation.x = Math.PI;
            centerCapDome.position.set(0, -0.81, 0);
            handsCenterGrp.add(centerCap, centerCapDome);
            platineGrp.add(handsCenterGrp);

            // 6. Aiguille de Petite Seconde à 9h
            meshSmallSecondsHand = new THREE.Group();
            meshSmallSecondsHand.position.set(-5.4, -0.62, 0.0);
            const secLance = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 1.65), matPolishedSteel);
            secLance.position.set(0, 0, 0.825);
            const secCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16), matPolishedSteel);
            const secCounterweight = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 8, 24), matPolishedSteel);
            secCounterweight.rotation.x = Math.PI / 2;
            secCounterweight.position.set(0, 0, -0.32);
            meshSmallSecondsHand.add(secLance, secCenter, secCounterweight);
            platineGrp.add(meshSmallSecondsHand);

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

            meshWindingCrown = createProceduralGearMesh(1.15, 0.2, 24, 0.65, matBrassGold, 0);
            meshWindingCrown.rotation.z = Math.PI / 2;
            meshWindingCrown.position.set(9.8, 0.2, 0);
            windingGrp.add(meshWindingCrown);

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

            meshBarrel = new THREE.Group();
            const barrelDrumGear = createProceduralGearMesh(3.35, 2.85, 84, 0.45, matBrassGold, 6);
            meshBarrel.add(barrelDrumGear);

            const barrelArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.4, 24), matPolishedSteel);
            barrelArbor.position.y = 0.5;
            meshBarrel.add(barrelArbor);

            meshMainspringSpiral = new THREE.Group();
            meshMainspringSpiral.position.y = 0.28;
            rebuildMainspringSpiralGeometry(matNivaflex);
            meshBarrel.add(meshMainspringSpiral);

            barrelOrganGrp.add(meshBarrel);
            layerGroups[2].add(barrelOrganGrp);

            // =========================================================================
            // LAYER 3 : LA CHAÎNE CINÉMATIQUE (CENTRE Z=64, MOYENNE Z=60, SECONDE 9H Z=60)
            // =========================================================================
            const centerGrp = new THREE.Group();
            centerGrp.position.set(0, 0.42, 0);
            centerGrp.userData.organId = 'centerWheel';
            organMeshes.centerWheel = centerGrp;

            meshCenterWheel = new THREE.Group();
            const cwGear = createProceduralGearMesh(2.55, 2.1, 64, 0.16, matBrassGold, 5);
            const cwPinion = createProceduralGearMesh(0.48, 0.15, 12, 0.75, matPolishedSteel, 0);
            cwPinion.position.y = -0.35;
            const cwArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.9, 16), matPolishedSteel);
            meshCenterWheel.add(cwGear, cwPinion, cwArbor);
            centerGrp.add(meshCenterWheel);
            centerGrp.add(createRubyJewelUnit(0.38, false, matRuby, matBrassGold));
            layerGroups[3].add(centerGrp);

            const thirdGrp = new THREE.Group();
            thirdGrp.position.set(-3.2, 0.68, -2.8);
            thirdGrp.userData.organId = 'thirdWheel';
            organMeshes.thirdWheel = thirdGrp;

            meshThirdWheel = new THREE.Group();
            const twGear = createProceduralGearMesh(2.15, 1.75, 60, 0.15, matBrassGold, 5);
            const twPinion = createProceduralGearMesh(0.42, 0.12, 8, 0.65, matPolishedSteel, 0);
            twPinion.position.y = -0.32;
            const twArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.4, 16), matPolishedSteel);
            meshThirdWheel.add(twGear, twPinion, twArbor);
            thirdGrp.add(meshThirdWheel);
            thirdGrp.add(createRubyJewelUnit(0.32, false, matRuby, matBrassGold));
            layerGroups[3].add(thirdGrp);

            const fourthGrp = new THREE.Group();
            fourthGrp.position.set(-5.4, 0.48, 0.2);
            fourthGrp.userData.organId = 'fourthWheel';
            organMeshes.fourthWheel = fourthGrp;

            meshFourthWheel = new THREE.Group();
            const fwGear = createProceduralGearMesh(2.1, 1.72, 60, 0.15, matBrightGold, 5);
            const fwPinion = createProceduralGearMesh(0.4, 0.12, 8, 0.65, matPolishedSteel, 0);
            fwPinion.position.y = 0.05;
            const fwArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.85, 16), matPolishedSteel);
            meshFourthWheel.add(fwGear, fwPinion, fwArbor);
            fourthGrp.add(meshFourthWheel);
            fourthGrp.add(createRubyJewelUnit(0.32, false, matRuby, matBrassGold));
            layerGroups[3].add(fourthGrp);

            // =========================================================================
            // LAYER 4 : ÉCHAPPEMENT À ANCRE SUISSE HAUTE HORLOGERIE 3D (ROUE CLUB & ANCRE)
            // =========================================================================
            const escapeGrp = new THREE.Group();
            escapeGrp.position.set(-2.8, 0.35, 3.9);
            escapeGrp.userData.organId = 'escapeWheel';
            organMeshes.escapeWheel = escapeGrp;

            meshEscapeWheel = new THREE.Group();
            const ewGear = createProceduralGearMesh(1.52, 1.08, 15, 0.14, matPolishedSteel, 4, true);
            const ewPinion = createProceduralGearMesh(0.32, 0.1, 6, 0.55, matDarkSteel, 0);
            ewPinion.position.y = 0.05;
            const ewArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.35, 16), matPolishedSteel);
            meshEscapeWheel.add(ewGear, ewPinion, ewArbor);
            escapeGrp.add(meshEscapeWheel);
            escapeGrp.add(createRubyJewelUnit(0.28, false, matRuby, matBrassGold));
            layerGroups[4].add(escapeGrp);

            const palletGrp = new THREE.Group();
            palletGrp.position.set(-0.6, 0.40, 4.2);
            palletGrp.userData.organId = 'palletFork';
            organMeshes.palletFork = palletGrp;

            meshPalletFork = new THREE.Group();
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
            anchorShape.lineTo(2.48, -0.10);
            anchorShape.lineTo(2.22, -0.26);
            anchorShape.lineTo(2.28, -0.58);
            anchorShape.lineTo(2.58, -0.64);
            anchorShape.lineTo(2.62, -0.50);
            anchorShape.lineTo(2.18, -0.60);
            anchorShape.lineTo(0.05, 0.15);
            anchorShape.closePath();

            const anchorExtrude = new THREE.ExtrudeGeometry(anchorShape, {
                depth: 0.11,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 1,
                bevelSize: 0.015,
                bevelThickness: 0.015
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

            const matMoebius9415 = new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0284C7, transparent: true, opacity: 0.85 });
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

            // =========================================================================
            // LAYER 5 : BALANCIER GLUCYDUR, DOUBLE PLATEAU, ELLIPSE RUBIS & SPIRAL (À 5H)
            // =========================================================================
            const balanceGrp = new THREE.Group();
            balanceGrp.position.set(2.8, 0.65, 3.6);
            balanceGrp.userData.organId = 'balance';
            organMeshes.balance = balanceGrp;

            meshBalanceWheel = new THREE.Group();
            const balRim = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.16, 16, 48), matBrassGold);
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

            const largeRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.10, 32), matPolishedSteel);
            largeRoller.position.y = -0.20;

            const safetyRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.14, 28), matDarkSteel);
            safetyRoller.position.y = -0.32;

            const impulseRubyPin = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.28, 16), matRuby);
            impulseRubyPin.position.set(-0.62, -0.28, 0.18);

            const balArbor = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.45, 16), matPolishedSteel);
            meshBalanceWheel.add(largeRoller, safetyRoller, impulseRubyPin, balArbor);
            balanceGrp.add(meshBalanceWheel);

            meshHairspring = new THREE.Group();
            meshHairspring.position.y = 0.26;
            const hsPoints = [];
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
            const matBarrelBridge = createBridgeMat(0xE2E8F0);
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
                bevelSegments: 4
            });
            barrelBridgeGeom.rotateX(Math.PI / 2);
            const barrelBridgeMesh = new THREE.Mesh(barrelBridgeGeom, matBarrelBridge);
            barrelBridgeMesh.position.y = 0.12;
            barrelBridgeMesh.userData.organId = 'barrel';
            bridgesTopGrp.add(barrelBridgeMesh);

            meshRatchetWheel = createProceduralGearMesh(2.55, 0.55, 48, 0.20, matPolishedSteel, 0);
            meshRatchetWheel.position.set(4.5, 0.25, -3.2);
            meshRatchetWheel.userData.organId = 'barrel';
            meshRatchetWheel.add(createBluedScrew(0, 0.14, 0, matPolishedSteel, false));
            bridgesTopGrp.add(meshRatchetWheel);

            meshCrownWheel = createProceduralGearMesh(1.52, 0.45, 34, 0.20, matPolishedSteel, 0);
            meshCrownWheel.position.set(6.4, 0.25, -0.8);
            meshCrownWheel.userData.organId = 'winding';
            meshCrownWheel.add(createBluedScrew(0, 0.16, 0, matBluedSteel, true));
            bridgesTopGrp.add(meshCrownWheel);

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
            const matTrainBridge = createBridgeMat(0xE2E8F0);
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
                bevelSegments: 4
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

            // 3. Coq de Balancier Sculpté ETA 6497-1 (avec bras élancé, porte-piton et raquette A/R)
            const matBalanceCock = createBridgeMat(0xE2E8F0);
            const cockShape = new THREE.Shape();
            // Note: ExtrudeGeometry rotated +PI/2 around X maps shape (x, y) to world (x, -z), so y is negative for +Z
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
                bevelSegments: 3
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

            setupViewportInteractions(renderer.domElement);

            window.addEventListener('resize', () => {
                const cw = container.clientWidth;
                const ch = container.clientHeight;
                if (cw && ch) {
                    camera.aspect = cw / ch;
                    camera.updateProjectionMatrix();
                    renderer.setSize(cw, ch);
                }
            });
        }

        function rebuildMainspringSpiralGeometry(matNivaflex?: THREE.Material) {
            if (!meshMainspringSpiral) return;
            while (meshMainspringSpiral.children.length > 0) {
                const old = meshMainspringSpiral.children[0];
                old.geometry.dispose();
                meshMainspringSpiral.remove(old);
            }

            const chargeRatio = simState.mainspringCharge / 100;
            const turns = 5.5 + chargeRatio * 3.5;
            const pts = [];
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
            const mat = matNivaflex || new THREE.MeshStandardMaterial({ color: 0x38BDF8, metalness: 0.8, roughness: 0.25 });
            meshMainspringSpiral.add(new THREE.Mesh(tubeGeom, mat));
        }

        /**
         * 5. EFFORTLESS 360° QUATERNION TRACKBALL + PAN + TOUCH PINCH + RAYCASTING
         */
        function setupViewportInteractions(domElem: HTMLElement) {
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            let downTime = 0;
            let downPos = { x: 0, y: 0 };

            domElem.addEventListener('contextmenu', (e) => e.preventDefault());

            // Double-click anywhere to smoothly re-center pivot
            domElem.addEventListener('dblclick', () => {
                trackball.targetPivot.set(0, 0, 0);
                trackball.targetZoom = 20.5;
            });

            domElem.addEventListener('pointerdown', (e) => {
                trackball.isDragging = true;
                trackball.isPanning = (e.button === 2 || e.shiftKey);
                trackball.prevX = e.clientX;
                trackball.prevY = e.clientY;
                trackball.velX = 0;
                trackball.velY = 0;
                downTime = performance.now();
                downPos = { x: e.clientX, y: e.clientY };
                domElem.style.cursor = 'grabbing';
            });

            window.addEventListener('pointermove', (e) => {
                if (!trackball.isDragging) return;
                const dx = e.clientX - trackball.prevX;
                const dy = e.clientY - trackball.prevY;
                trackball.prevX = e.clientX;
                trackball.prevY = e.clientY;

                if (trackball.isPanning) {
                    // Smooth X/Y screen-space panning
                    const panSpeed = trackball.currentZoom * 0.0012;
                    trackball.targetPivot.x += dx * panSpeed;
                    trackball.targetPivot.y -= dy * panSpeed;
                } else {
                    // Pure 360° Quaternion Trackball around Screen X and Screen Y axes (ZERO Gimbal Lock!)
                    const rotSpeed = 0.0075;
                    const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * rotSpeed);
                    const qPitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * rotSpeed);

                    trackball.targetQuat.premultiply(qYaw).premultiply(qPitch).normalize();
                    trackball.velX = dx * rotSpeed * 0.45;
                    trackball.velY = dy * rotSpeed * 0.45;
                }
            });

            window.addEventListener('pointerup', (e) => {
                if (!trackball.isDragging) return;
                trackball.isDragging = false;
                domElem.style.cursor = 'grab';

                const moveDist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
                if (performance.now() - downTime < 260 && moveDist < 6) {
                    const rect = domElem.getBoundingClientRect();
                    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

                    raycaster.setFromCamera(mouse, camera);
                    const clickableRoots = Object.values(organMeshes);
                    const intersects = raycaster.intersectObjects(clickableRoots, true);

                    if (intersects.length > 0) {
                        let obj = intersects[0].object;
                        while (obj && !obj.userData.organId && obj.parent) {
                            obj = obj.parent;
                        }
                        if (obj && obj.userData.organId) {
                            selectOrgan(obj.userData.organId);
                        }
                    }
                }
            });

            // Smooth Wheel Zoom
            domElem.addEventListener('wheel', (e) => {
                e.preventDefault();
                trackball.targetZoom = Math.max(5.5, Math.min(35.0, trackball.targetZoom + e.deltaY * 0.014));
            }, { passive: false });

            // Mobile Pinch-to-Zoom Support
            domElem.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    trackball.isDragging = false;
                    trackball.pinchStartDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            }, { passive: true });

            domElem.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2 && trackball.pinchStartDist > 0) {
                    const dist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    const delta = trackball.pinchStartDist - dist;
                    trackball.targetZoom = Math.max(5.5, Math.min(35.0, trackball.targetZoom + delta * 0.04));
                    trackball.pinchStartDist = dist;
                }
            }, { passive: true });

            // Keyboard Arrow Controls
            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') nudgeTrackball(0, -0.12);
                else if (e.key === 'ArrowRight') nudgeTrackball(0, 0.12);
                else if (e.key === 'ArrowUp') nudgeTrackball(-0.12, 0);
                else if (e.key === 'ArrowDown') nudgeTrackball(0.12, 0);
            });
        }

        /**
         * 6. CAMERA PRESETS & ORGAN SELECTION INSPECTOR
         */
        function toggleDialFace() {
            simState.isDialSideShown = !simState.isDialSideShown;
            if (simState.isDialSideShown) {
                setCameraPreset('dial');
            } else {
                setCameraPreset('iso');
            }
        }

        function setCameraPreset(preset: string) {
            ['iso', 'topBridges', 'dial', 'escapement', 'balanceMacro', 'profile'].forEach(id => {
                const btn = document.getElementById(`camBtn_${id}`);
                if (btn) {
                    btn.className = (id === preset)
                        ? "px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-horlo-gold text-black transition flex items-center gap-1.5 shadow"
                        : "px-2.5 py-1.5 rounded-lg text-xs font-mono text-horlo-rhodium hover:text-white bg-horlo-bg border border-horlo-border transition flex items-center gap-1.5";
                }
            });

            if (preset === 'iso') {
                simState.isDialSideShown = false;
                setTrackballEuler(0.88, -0.38, 0);
                trackball.targetPivot.set(0, 0, 0);
                trackball.targetZoom = 20.5;
            } else if (preset === 'topBridges') {
                simState.isDialSideShown = false;
                setTrackballEuler(Math.PI / 2, 0, 0);
                trackball.targetPivot.set(0, 0, 0);
                trackball.targetZoom = 20.0;
            } else if (preset === 'dial') {
                simState.isDialSideShown = true;
                // Flip cleanly to view the Dial upright (12h at top, 3h crown on right, 9h seconds on left)
                setTrackballEuler(-Math.PI / 2, 0, 0);
                trackball.targetPivot.set(0, 0.4, 0);
                trackball.targetZoom = 20.0;
                selectOrgan('dial');
            } else if (preset === 'escapement') {
                simState.isDialSideShown = false;
                setTrackballEuler(1.18, 0.15, 0);
                trackball.targetPivot.set(1.2, -0.4, -4.0);
                trackball.targetZoom = 7.8;
                if (simState.xrayFactor < 0.65) quickSetXray(75);
                selectOrgan('palletFork');
            } else if (preset === 'balanceMacro') {
                simState.isDialSideShown = false;
                setTrackballEuler(1.05, -0.32, 0);
                trackball.targetPivot.set(-2.8, -0.6, -3.6);
                trackball.targetZoom = 9.5;
                selectOrgan('balance');
            } else if (preset === 'profile') {
                simState.isDialSideShown = false;
                setTrackballEuler(0.12, -0.65, 0);
                trackball.targetPivot.set(0, -0.3, 0);
                trackball.targetZoom = 23.0;
                if (simState.explodeFactor < 0.45) quickSetExplode(65);
            }
        }

        function selectOrgan(organId: string) {
            const data = ORGAN_DATABASE[organId];
            if (!data) return;
            simState.selectedOrgan = organId;

callbacks.onOrganSelect?.(data);
        }

        function focusSelectedOrganCamera() {
            const data = ORGAN_DATABASE[simState.selectedOrgan];
            if (!data) return;
            if (simState.selectedOrgan === 'dial') {
                setCameraPreset('dial');
                return;
            }
            setTrackballEuler(1.12, -0.22, 0);
            trackball.targetPivot.set(data.focusOffset.x, data.focusOffset.y, data.focusOffset.z);
            trackball.targetZoom = data.zoomDist || 11.0;
        }

        function resetCameraAndView() {
            setCameraPreset('iso');
        }

        /**
         * 7. CIECHANOWSKI INTERACTIVE SLIDER HANDLERS
         */
        function setSimSpeed(spd: number) {
            simState.speedMultiplier = spd;
// speed UI handled by React
        }

        function onScrubBeatSlider(val: number) {
            // Switch to manual scrub mode so user has full frame-by-frame control
            setSimSpeed(0);
            simState.beatPhasePct = Number(val);
            updateBeatLabel();
        }

        function updateBeatLabel() {
            // handled by React state
        }

        function onExplodeSlider(val: number) {
            const pct = Math.round(Number(val));
            simState.explodeFactor = pct / 100;
            
            
        }

        function quickSetExplode(pct: number) {
            onExplodeSlider(pct);
        }

        function onXraySlider(val: number) {
            const pct = Math.round(Number(val));
            simState.xrayFactor = pct / 100;
            
            
            bridgeMaterials.forEach(m => {
                m.opacity = Math.max(0.06, 1 - simState.xrayFactor);
            });
        }

        function quickSetXray(pct: number) {
            onXraySlider(pct);
        }

        function onMainspringSlider(val: number) {
            const pct = Math.round(Number(val));
            simState.mainspringCharge = pct;
            

            const torque = (1.8 + (pct / 100) * 8.7).toFixed(1);
            const amp = Math.round(185 + (pct / 100) * 125);
            
            callbacks.onAmplitudeChange?.(amp, parseFloat(torque));

            rebuildMainspringSpiralGeometry();

            // Rotate Crown, Crown Wheel & Ratchet Wheel visually when winding
            if (meshWindingCrown && meshCrownWheel && meshRatchetWheel) {
                const windRot = (pct / 100) * Math.PI * 8;
                meshWindingCrown.rotation.x = windRot;
                meshCrownWheel.rotation.y = -windRot * 0.5;
                meshRatchetWheel.rotation.y = windRot * 0.25;
            }
        }

        function windCrownStep() {
            const nextVal = Math.min(100, simState.mainspringCharge + 15);
            onMainspringSlider(nextVal);
            playMechanicalAcousticImpulse('chute');
        }

        /**
         * 8. REAL-TIME KINEMATIC LOOP (QUATERNION TRACKBALL + 3D GEARS + HANDS)
         */
        let lastFrameTime = performance.now();

        function animateMasterCalibre(now: number) {
            requestAnimationFrame(animateMasterCalibre);

            const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
            lastFrameTime = now;

            // 1. Apply Inertia & Quaternion Spherical Interpolation (Slerp) for silky 360° rotation
            if (!trackball.isDragging && (Math.abs(trackball.velX) > 0.0001 || Math.abs(trackball.velY) > 0.0001)) {
                const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), trackball.velX);
                const qPitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), trackball.velY);
                trackball.targetQuat.premultiply(qYaw).premultiply(qPitch).normalize();
                trackball.velX *= 0.92;
                trackball.velY *= 0.92;
            }

            trackball.currentQuat.slerp(trackball.targetQuat, 0.16);
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

            // 3. Advance Beat Progress if speedMultiplier > 0 (1 beat = 200 ms at 18'000 A/h = 5 beats/sec)
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
                    callbacks.onBeatUpdate?.(simState.beatPhasePct);
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
            const totalHalfSteps = (simState.totalEscapeTeethPassed * 2) + toothStepProgress;
            const escapeWheelAngle = totalHalfSteps * ((Math.PI * 2) / 30);

            // 5. Apply Rotations to 3D Calibre Meshes
            if (meshBalanceWheel && meshHairspring) {
                meshBalanceWheel.rotation.y = balanceAngle;
                const breatheScale = 1.0 + Math.sin(balanceAngle) * 0.065;
                meshHairspring.scale.set(breatheScale, 1, breatheScale);
            }

            if (meshPalletFork) {
                meshPalletFork.rotation.y = palletAngleRad;
            }

            if (meshEscapeWheel) {
                meshEscapeWheel.rotation.y = -escapeWheelAngle;
            }
            if (meshFourthWheel) {
                meshFourthWheel.rotation.y = escapeWheelAngle / 10;
            }
            if (meshThirdWheel) {
                meshThirdWheel.rotation.y = -escapeWheelAngle / 75;
            }
            if (meshCenterWheel) {
                meshCenterWheel.rotation.y = escapeWheelAngle / 600;
            }
            if (meshBarrel) {
                meshBarrel.rotation.y = -escapeWheelAngle / 4200;
            }

            // Synchronized Hands on Dial Side
            if (meshHourHand) {
                meshHourHand.rotation.y = (escapeWheelAngle / 7200);
            }
            if (meshMinuteHand) {
                meshMinuteHand.rotation.y = (escapeWheelAngle / 600);
            }
            if (meshSmallSecondsHand) {
                meshSmallSecondsHand.rotation.y = (escapeWheelAngle / 10);
            }

            updateEscapementHudTelemetry(p);

            renderer.render(scene, camera);
        }

        function updateEscapementHudTelemetry(p: number) {
            let tag = "";
            let desc = "";
            if (p < 0.22) {
                tag = "1. Repos & Tirage (12°)";
                desc = "La dent club de la roue d'échappement 3D s'appuie sur le plan de repos de la palette rubis pendant que le balancier descend son arc.";
            } else if (p < 0.36) {
                tag = "2. Dégagement par l'Ellipse";
                desc = "L'ellipse en rubis du double plateau 3D entre dans les cornes de la fourchette et dégage la palette du plan de repos.";
            } else if (p < 0.68) {
                tag = "3. Impulsion sur Palette (44°)";
                desc = "La dent club glisse sur le plan d'impulsion de la palette rubis (Moebius 9415) et relance le double plateau du balancier.";
            } else if (p < 0.78) {
                tag = "4. Chute & Verrouillage";
                desc = "La dent quitte la palette de sortie et la roue 3D parcourt sa chute libre (~1.5°) avant le choc acoustique sur la palette opposée.";
            } else {
                tag = "5. Arc Supplémentaire";
                desc = "L'ancre est maintenue contre sa goupille de limitation par le tirage de 12° pendant que le balancier achève son oscillation libre.";
            }
            callbacks.onPhaseChange?.(tag, desc);
        }

        /**
         * INITIALIZE ON WINDOW LOAD
         */

    // Initialize 3D Scene
    initThreeCalibre6497();
    selectOrgan('barrel');
    onMainspringSlider(85);
    animFrameId = requestAnimationFrame(animateMasterCalibre);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
        if (isDisposed || !container || !renderer || !camera) return;
        const rw = container.clientWidth || 800;
        const rh = container.clientHeight || 560;
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer.setSize(rw, rh);
    });
    resizeObserver.observe(container);

    return {
        setCameraPreset: (preset) => {
            setCameraPreset(preset);
        },
        selectOrgan: (organId) => {
            selectOrgan(organId);
        },
        focusSelectedOrganCamera: () => {
            focusSelectedOrganCamera();
        },
        flipCalibre180: () => {
            flipCalibre180();
            callbacks.onDialSideToggle?.(simState.isDialSideShown);
            return simState.isDialSideShown;
        },
        setSimSpeed: (spd) => {
            setSimSpeed(spd);
        },
        scrubBeat: (val) => {
            onScrubBeatSlider(val);
        },
        setExplode: (val) => {
            onExplodeSlider(val);
        },
        setXray: (val) => {
            onXraySlider(val);
        },
        setMainspring: (val) => {
            onMainspringSlider(val);
        },
        windCrownStep: () => {
            windCrownStep();
        },
        nudgeTrackball: (deltaPitchX, deltaYawY) => {
            nudgeTrackball(deltaPitchX, deltaYawY);
        },
        toggleAudio: () => {
            return toggleAudioTick();
        },
        dispose: () => {
            isDisposed = true;
            cancelAnimationFrame(animFrameId);
            resizeObserver.disconnect();
            if (audioCtx) {
                try { audioCtx.close(); } catch (e) {}
            }
            if (renderer) {
                renderer.dispose();
                if (renderer.domElement && renderer.domElement.parentElement) {
                    renderer.domElement.parentElement.removeChild(renderer.domElement);
                }
            }
        }
    };
}
