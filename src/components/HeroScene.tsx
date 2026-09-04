"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "./ScrollManager";

/* ── Helpers ────────────────────────────────────────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/* ── Torso Profile ──────────────────────────────────── */

function createTorsoProfile(radiusScale = 1): THREE.Vector2[] {
  const s = radiusScale;
  return [
    new THREE.Vector2(0 * s, -1.80),
    new THREE.Vector2(0.06 * s, -1.70),
    new THREE.Vector2(0.15 * s, -1.35),
    new THREE.Vector2(0.19 * s, -1.00),
    new THREE.Vector2(0.21 * s, -0.75),
    new THREE.Vector2(0.13 * s, -0.50), // waist
    new THREE.Vector2(0.24 * s, -0.10),
    new THREE.Vector2(0.28 * s, 0.15), // chest
    new THREE.Vector2(0.26 * s, 0.35),
    new THREE.Vector2(0.22 * s, 0.55),
    new THREE.Vector2(0.30 * s, 0.72), // shoulders (widest)
    new THREE.Vector2(0.09 * s, 0.92), // neck
    new THREE.Vector2(0.13 * s, 1.10),
    new THREE.Vector2(0.11 * s, 1.25), // head
    new THREE.Vector2(0.07 * s, 1.40),
    new THREE.Vector2(0 * s, 1.50),
  ];
}

/** Shared torso rotation — keeps all torso-aligned elements in sync */
function getTorsoRot(t: number, p: number) {
  const trainBoost = smoothstep(0.5, 0.67, p);
  return {
    y: t * 0.1 + trainBoost * t * 0.15,
    x: Math.sin(t * 0.12) * 0.02,
  };
}

/* ── Ring constants shared between MeasurementRings and DataMarkers ── */

const RING_CONFIGS = [
  { radius: 0.48, y: 0.35, tiltX: Math.PI / 6, tiltZ: 0 },
  { radius: 0.54, y: -0.10, tiltX: 0, tiltZ: Math.PI / 5 },
  { radius: 0.42, y: 0.85, tiltX: Math.PI / 4, tiltZ: Math.PI / 6 },
] as const;

/* ================================================================== */
/*  TorsoForm — faceted human-silhouette LatheGeometry                */
/* ================================================================== */

function TorsoForm({ progress }: { progress: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(() => {
    const g = new THREE.LatheGeometry(createTorsoProfile(), 8);
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    const mat = matRef.current;
    if (!m || !mat) return;
    const p = progress.current;
    const t = clock.elapsedTime;
    const rot = getTorsoRot(t, p);

    m.rotation.y = rot.y;
    m.rotation.x = rot.x;
    m.scale.setScalar(1 + Math.sin(t * 0.6) * 0.005);

    mat.emissiveIntensity =
      0.015 +
      smoothstep(0.15, 0.3, p) * 0.035 +
      smoothstep(0.83, 1, p) * 0.08;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        ref={matRef}
        color="#0c0c0e"
        metalness={0.95}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.03}
        emissive="#2997ff"
        emissiveIntensity={0.015}
        envMapIntensity={2.2}
        flatShading
      />
    </mesh>
  );
}

/* ================================================================== */
/*  TorsoEdges — subtle blue wireframe overlay                        */
/* ================================================================== */

function TorsoEdges({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<THREE.LineSegments>(null);

  const geo = useMemo(() => {
    const lathe = new THREE.LatheGeometry(createTorsoProfile(1.018), 8);
    return new THREE.EdgesGeometry(lathe, 10);
  }, []);

  useFrame(({ clock }) => {
    const l = ref.current;
    if (!l) return;
    const p = progress.current;
    const t = clock.elapsedTime;
    const rot = getTorsoRot(t, p);
    l.rotation.y = rot.y;
    l.rotation.x = rot.x;
    l.scale.setScalar(1 + Math.sin(t * 0.6) * 0.005);

    const mat = l.material as THREE.LineBasicMaterial;
    mat.opacity =
      0.02 +
      smoothstep(0.12, 0.25, p) * 0.08 +
      smoothstep(0.83, 1, p) * 0.05;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#2997ff" transparent opacity={0.02} />
    </lineSegments>
  );
}

/* ================================================================== */
/*  EnergyCore — glowing inner sphere at chest level                  */
/* ================================================================== */

function EnergyCore({ progress }: { progress: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const blue = useMemo(() => new THREE.Color("#2997ff"), []);
  const warm = useMemo(() => new THREE.Color("#ff6b35"), []);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    const mat = matRef.current;
    if (!m || !mat) return;
    const p = progress.current;
    const t = clock.elapsedTime;

    m.position.y = 0.15;
    const pulse =
      Math.sin(t * 1.5) * 0.003 +
      smoothstep(0.5, 0.6, p) * Math.sin(t * 3) * 0.008;
    m.scale.setScalar(0.055 + pulse);

    mat.opacity = lerp(0.15, 0.65, smoothstep(0.08, 0.4, p));
    const fuelBlend = Math.max(
      0,
      smoothstep(0.33, 0.45, p) - smoothstep(0.5, 0.6, p)
    );
    const target = new THREE.Color().lerpColors(blue, warm, fuelBlend);
    mat.emissive.lerp(target, 0.04);
    mat.emissiveIntensity = lerp(1, 3.5, smoothstep(0.2, 0.5, p));
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        ref={matRef}
        color="#000"
        emissive="#2997ff"
        emissiveIntensity={1}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

/* ================================================================== */
/*  FloatingPanels — armor-like plates around the torso               */
/* ================================================================== */

const PANELS = [
  { a: 0.35, y: 0.2, w: 0.07, h: 0.42, d: 0.004 },
  { a: -0.35, y: 0.2, w: 0.07, h: 0.42, d: 0.004 },
  { a: Math.PI + 0.35, y: 0.15, w: 0.06, h: 0.38, d: 0.004 },
  { a: Math.PI - 0.35, y: 0.15, w: 0.06, h: 0.38, d: 0.004 },
  { a: Math.PI / 2, y: 0.7, w: 0.05, h: 0.18, d: 0.003 },
  { a: -Math.PI / 2, y: 0.7, w: 0.05, h: 0.18, d: 0.003 },
] as const;

function FloatingPanels({ progress }: { progress: React.RefObject<number> }) {
  const gRef = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const g = gRef.current;
    if (!g) return;
    const p = progress.current;
    const t = clock.elapsedTime;
    const rot = getTorsoRot(t, p);
    g.rotation.y = rot.y;

    refs.current.forEach((m, i) => {
      if (!m) return;
      const { a, y } = PANELS[i];
      const near = 0.30;
      const far = 0.55;
      const expand = smoothstep(0.15, 0.3, p);
      const contract = smoothstep(0.7, 0.85, p);
      const d = lerp(near, far, expand) - contract * 0.14;

      m.position.set(Math.sin(a) * d, y, Math.cos(a) * d);
      m.rotation.y = a;

      // Train vibration
      m.position.x +=
        smoothstep(0.5, 0.6, p) * Math.sin(t * 5 + i) * 0.007;

      const mat = m.material as THREE.MeshPhysicalMaterial;
      mat.opacity = smoothstep(0.05, 0.15, p);
    });
  });

  return (
    <group ref={gRef}>
      {PANELS.map((c, i) => (
        <mesh
          key={i}
          ref={(el: THREE.Mesh | null) => {
            refs.current[i] = el;
          }}
        >
          <boxGeometry args={[c.w, c.h, c.d]} />
          <meshPhysicalMaterial
            color="#101014"
            metalness={0.92}
            roughness={0.12}
            clearcoat={0.9}
            clearcoatRoughness={0.08}
            transparent
            opacity={0}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ================================================================== */
/*  SpineAxis — vertical glowing axis + nodes                         */
/* ================================================================== */

function SpineAxis({ progress }: { progress: React.RefObject<number> }) {
  const gRef = useRef<THREE.Group>(null);
  const nodeYs = useMemo(
    () => Array.from({ length: 7 }, (_, i) => -1.4 + (i / 6) * 2.6),
    []
  );

  useFrame(({ clock }) => {
    const g = gRef.current;
    if (!g) return;
    const p = progress.current;
    const t = clock.elapsedTime;
    const rot = getTorsoRot(t, p);
    g.rotation.y = rot.y;
    g.rotation.x = rot.x;

    const op = smoothstep(0.12, 0.25, p) * 0.35;
    g.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = op;
      }
    });
  });

  return (
    <group ref={gRef}>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 2.9, 4]} />
        <meshStandardMaterial
          color="#2997ff"
          emissive="#2997ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0}
        />
      </mesh>
      {nodeYs.map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial
            color="#2997ff"
            emissive="#2997ff"
            emissiveIntensity={1}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ================================================================== */
/*  MeasurementRings — ultra-thin precision torus rings               */
/* ================================================================== */

function MeasurementRings({
  progress,
}: {
  progress: React.RefObject<number>;
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const p = progress.current;
    const t = clock.elapsedTime;

    refs.current.forEach((ring, i) => {
      if (!ring) return;
      const cfg = RING_CONFIGS[i];
      const expand = smoothstep(0.12, 0.28, p);
      const contract = smoothstep(0.7, 0.85, p);
      const s =
        lerp(0.8, 1.3, expand) - contract * 0.2;
      ring.scale.setScalar(s);
      ring.position.y = cfg.y;
      ring.rotation.x = cfg.tiltX + t * (0.06 + i * 0.025);
      ring.rotation.z = cfg.tiltZ;
      ring.rotation.y = t * (0.04 + i * 0.015);
      ring.rotation.x += smoothstep(0.5, 0.6, p) * t * 0.1;

      const mat = ring.material as THREE.MeshStandardMaterial;
      mat.opacity = smoothstep(0.1, 0.22, p) * 0.5;
    });
  });

  return (
    <>
      {RING_CONFIGS.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el: THREE.Mesh | null) => {
            refs.current[i] = el;
          }}
        >
          <torusGeometry args={[cfg.radius, 0.0015, 8, 100]} />
          <meshStandardMaterial
            color="#48484a"
            emissive="#2997ff"
            emissiveIntensity={0.06}
            transparent
            opacity={0}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

/* ================================================================== */
/*  DataMarkers — instanced spheres on ring paths                     */
/* ================================================================== */

function DataMarkers({ progress }: { progress: React.RefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const markersPerRing = 5;
  const count = markersPerRing * RING_CONFIGS.length;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const im = meshRef.current;
    if (!im) return;
    const p = progress.current;
    const t = clock.elapsedTime;
    const nodeOp = smoothstep(0.15, 0.28, p);
    const pulseFac = smoothstep(0.5, 0.6, p);

    for (let i = 0; i < count; i++) {
      const ri = Math.floor(i / markersPerRing);
      const ni = i % markersPerRing;
      const cfg = RING_CONFIGS[ri];

      const expand = smoothstep(0.12, 0.28, p);
      const contract = smoothstep(0.7, 0.85, p);
      const r =
        cfg.radius * lerp(0.8, 1.3, expand) -
        contract * cfg.radius * 0.2;

      const angle = (ni / markersPerRing) * Math.PI * 2 + t * 0.06;
      let x = Math.cos(angle) * r;
      let y = Math.sin(angle) * r;
      const z0 = 0;

      // tiltX
      const cx = Math.cos(cfg.tiltX),
        sx = Math.sin(cfg.tiltX);
      const y1 = y * cx - z0 * sx;
      const z1 = y * sx + z0 * cx;

      // tiltZ
      const cz = Math.cos(cfg.tiltZ),
        sz = Math.sin(cfg.tiltZ);
      const x1 = x * cz - y1 * sz;
      const y2 = x * sz + y1 * cz;

      dummy.position.set(x1, y2 + cfg.y, z1);
      const pulse = pulseFac * Math.sin(t * 3.5 + i * 0.8) * 0.25;
      dummy.scale.setScalar(Math.max(0.01, (0.35 + pulse) * nodeOp));
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    }
    im.instanceMatrix.needsUpdate = true;

    const mat = im.material as THREE.MeshStandardMaterial;
    mat.opacity = nodeOp * 0.7;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.012, 6, 6]} />
      <meshStandardMaterial
        color="#f5f5f7"
        emissive="#2997ff"
        emissiveIntensity={0.3}
        transparent
        opacity={0}
        metalness={0.4}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

/* ================================================================== */
/*  AmbientParticles — refined cylindrical distribution               */
/* ================================================================== */

function AmbientParticles({
  progress,
}: {
  progress: React.RefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const count = isMobile ? 80 : 220;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 2.2;
      const y = (Math.random() - 0.5) * 5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return pos;
  }, [count]);

  const initPos = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts) return;
    const p = progress.current;
    const t = clock.elapsedTime;

    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] = initPos[ix] + Math.sin(t * 0.12 + i * 0.08) * 0.012;
      arr[ix + 1] =
        initPos[ix + 1] + Math.sin(t * 0.08 + i * 0.04) * 0.025;
      arr[ix + 2] =
        initPos[ix + 2] + Math.cos(t * 0.1 + i * 0.06) * 0.012;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    pts.rotation.y = t * 0.012;
    const converge = smoothstep(0.67, 0.83, p);
    pts.scale.setScalar(lerp(1, 0.6, converge));

    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = lerp(0.12, 0.35, smoothstep(0.08, 0.25, p));
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.005}
        color="#86868b"
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ================================================================== */
/*  CameraController — cinematic per-act camera with mouse parallax   */
/* ================================================================== */

function CameraController({
  progress,
}: {
  progress: React.RefObject<number>;
}) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    const p = progress.current;
    const m = mouse.current;

    let orbit = 0;
    let tY = 0.35;
    let tZ = 6.5;

    if (p < 0.17) {
      orbit = 0;
      tY = 0.35;
      tZ = 6.5;
    } else if (p < 0.33) {
      orbit = lerp(0, 0.18, smoothstep(0.17, 0.33, p));
      tY = lerp(0.35, 0.55, smoothstep(0.17, 0.33, p));
      tZ = lerp(6.5, 7.5, smoothstep(0.17, 0.33, p));
    } else if (p < 0.5) {
      orbit = lerp(0.18, 0.30, smoothstep(0.33, 0.5, p));
      tY = lerp(0.55, 0.45, smoothstep(0.33, 0.5, p));
      tZ = lerp(7.5, 5.8, smoothstep(0.33, 0.5, p));
    } else if (p < 0.67) {
      orbit = lerp(0.30, 0.08, smoothstep(0.5, 0.67, p));
      tY = lerp(0.45, -0.15, smoothstep(0.5, 0.67, p));
      tZ = lerp(5.8, 5.2, smoothstep(0.5, 0.67, p));
    } else if (p < 0.83) {
      orbit = lerp(0.08, 0.2, smoothstep(0.67, 0.83, p));
      tY = lerp(-0.15, 0.35, smoothstep(0.67, 0.83, p));
      tZ = lerp(5.2, 6.5, smoothstep(0.67, 0.83, p));
    } else {
      orbit = lerp(0.2, 0, smoothstep(0.83, 1, p));
      tY = lerp(0.35, 0.4, smoothstep(0.83, 1, p));
      tZ = lerp(6.5, 9, smoothstep(0.83, 1, p));
    }

    const tX = Math.sin(orbit) * tZ;
    const aZ = Math.cos(orbit) * tZ;

    camera.position.x = lerp(camera.position.x, tX + m.x * 0.12, 0.025);
    camera.position.y = lerp(camera.position.y, tY + m.y * -0.08, 0.025);
    camera.position.z = lerp(camera.position.z, aZ, 0.025);
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

/* ================================================================== */
/*  LightingRig — dramatic SpotLight key + colored fills              */
/* ================================================================== */

function LightingRig({ progress }: { progress: React.RefObject<number> }) {
  const spotRef = useRef<THREE.SpotLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);

  const white = useMemo(() => new THREE.Color("#e8e8ec"), []);
  const warm = useMemo(() => new THREE.Color("#ff6b35"), []);
  const blue = useMemo(() => new THREE.Color("#2997ff"), []);

  useFrame(({ clock }) => {
    const p = progress.current;
    const t = clock.elapsedTime;

    if (spotRef.current) {
      spotRef.current.position.set(
        3 + Math.sin(t * 0.08) * 0.4,
        4,
        3 + Math.cos(t * 0.08) * 0.4
      );
      spotRef.current.intensity = lerp(18, 30, smoothstep(0.83, 1, p));
    }

    if (fillRef.current) {
      const target = white.clone().multiplyScalar(0.35);
      if (p > 0.33 && p < 0.5) {
        target.lerp(warm, smoothstep(0.33, 0.45, p) * 0.6);
      } else if (p > 0.5 && p < 0.67) {
        target.lerp(blue, smoothstep(0.5, 0.6, p) * 0.5);
      }
      fillRef.current.color.lerp(target, 0.025);
      fillRef.current.position.set(-3, 0.5, 2);
    }

    if (rimRef.current) {
      rimRef.current.position.set(0, 1, -4);
      rimRef.current.intensity = lerp(0.4, 1.8, smoothstep(0.83, 1, p));
    }
  });

  return (
    <>
      <ambientLight intensity={0.05} color="#b0b0b4" />
      <spotLight
        ref={spotRef}
        intensity={18}
        color="#f0f0f4"
        position={[3, 4, 3]}
        angle={0.4}
        penumbra={0.8}
        decay={2}
        distance={25}
      />
      <pointLight
        ref={fillRef}
        intensity={0.4}
        color="#e8e8ec"
        distance={14}
        decay={2}
      />
      <pointLight
        ref={rimRef}
        intensity={0.4}
        color="#2997ff"
        distance={14}
        decay={2}
      />
    </>
  );
}

/* ================================================================== */
/*  Main Scene Export                                                  */
/* ================================================================== */

export default function HeroScene() {
  const { progress } = useScrollProgress();

  return (
    <>
      <fog attach="fog" args={["#050505", 6, 16]} />
      <LightingRig progress={progress} />
      <CameraController progress={progress} />
      <Environment preset="city" environmentIntensity={0.12} />

      {/* Core group — shifted up to leave room for text at bottom */}
      <group position={[0, 0.35, 0]}>
        <TorsoForm progress={progress} />
        <TorsoEdges progress={progress} />
        <EnergyCore progress={progress} />
        <FloatingPanels progress={progress} />
        <SpineAxis progress={progress} />
      </group>

      <MeasurementRings progress={progress} />
      <DataMarkers progress={progress} />
      <AmbientParticles progress={progress} />
    </>
  );
}
