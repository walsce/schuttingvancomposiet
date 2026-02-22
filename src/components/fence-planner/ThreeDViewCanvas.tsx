import { useMemo, Suspense, useEffect, useRef, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Bounds, useBounds } from "@react-three/drei";
import { PlacedPanel, PanelStyleId } from "./types";
import { POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";
import * as THREE from "three";

interface ThreeDViewCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
}

const SCALE = 0.01;
const POST_W = POST_WIDTH_CM * SCALE;
const PANEL_H = PANEL_HEIGHT_CM * SCALE;
const POST_DEPTH = POST_W;
const PANEL_DEPTH = 0.025;

function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

/* Single fence post */
function Post({ x, height }: { x: number; height: number }) {
  return (
    <group position={[x, height / 2, 0]}>
      <mesh>
        <boxGeometry args={[POST_W, height, POST_DEPTH]} />
        <meshStandardMaterial color="#333" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, height / 2 + 0.015, 0]}>
        <boxGeometry args={[POST_W + 0.01, 0.03, POST_DEPTH + 0.01]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}

/* Panel face with pattern */
function Panel({
  x, width, height, color, styleId,
}: {
  x: number; width: number; height: number; color: string; styleId: PanelStyleId;
}) {
  const threeColor = useMemo(() => hexToThreeColor(color), [color]);
  const darkerColor = useMemo(() => {
    const c = hexToThreeColor(color);
    c.multiplyScalar(0.85);
    return c;
  }, [color]);

  if (styleId === "horizontal-planks") {
    const plankCount = Math.floor(height / 0.12);
    const plankH = (height - (plankCount - 1) * 0.005) / plankCount;
    return (
      <group position={[x, 0, 0]}>
        {Array.from({ length: plankCount }, (_, i) => {
          const py = i * (plankH + 0.005) + plankH / 2;
          const shade = i % 2 === 0 ? threeColor : darkerColor;
          return (
            <mesh key={i} position={[0, py, 0]}>
              <boxGeometry args={[width, plankH - 0.002, PANEL_DEPTH]} />
              <meshStandardMaterial color={shade} roughness={0.7} metalness={0.05} />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (styleId === "vertical-slats") {
    const slatCount = Math.max(3, Math.floor(width / 0.1));
    const slatW = (width - (slatCount - 1) * 0.008) / slatCount;
    return (
      <group position={[x, height / 2, 0]}>
        {Array.from({ length: slatCount }, (_, i) => {
          const px = -width / 2 + i * (slatW + 0.008) + slatW / 2;
          const shade = i % 2 === 0 ? threeColor : darkerColor;
          return (
            <mesh key={i} position={[px, 0, 0]}>
              <boxGeometry args={[slatW, height - 0.01, PANEL_DEPTH]} />
              <meshStandardMaterial color={shade} roughness={0.7} metalness={0.05} />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (styleId === "louvers") {
    const louverCount = Math.floor(height / 0.08);
    const louverH = 0.05;
    const gap = (height - louverCount * louverH) / (louverCount - 1 || 1);
    return (
      <group position={[x, 0, 0]}>
        {Array.from({ length: louverCount }, (_, i) => {
          const py = i * (louverH + gap) + louverH / 2;
          return (
            <mesh key={i} position={[0, py, 0]} rotation={[0.15, 0, 0]}>
              <boxGeometry args={[width - 0.01, louverH, PANEL_DEPTH + 0.01]} />
              <meshStandardMaterial color={threeColor} roughness={0.6} metalness={0.1} />
            </mesh>
          );
        })}
      </group>
    );
  }

  return (
    <mesh position={[x, height / 2, 0]}>
      <boxGeometry args={[width, height, PANEL_DEPTH]} />
      <meshStandardMaterial color={threeColor} roughness={0.65} metalness={0.08} />
    </mesh>
  );
}

/* Ground plane */
function Ground({ length }: { length: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[length / 2, -0.005, 0]} receiveShadow>
      <planeGeometry args={[length + 2, 4]} />
      <meshStandardMaterial color="#6b8f5e" roughness={0.9} />
    </mesh>
  );
}

/* Auto-fit camera to fence bounds on change */
function AutoFit({ placedPanels, segmentLengthCm }: { placedPanels: PlacedPanel[]; segmentLengthCm: number }) {
  const bounds = useBounds();
  const prevKey = useRef("");

  useEffect(() => {
    const key = `${segmentLengthCm}-${placedPanels.length}-${placedPanels.map((p) => p.widthCm).join(",")}`;
    if (key !== prevKey.current) {
      prevKey.current = key;
      // Small delay to let geometry mount
      const t = setTimeout(() => bounds.refresh().fit(), 80);
      return () => clearTimeout(t);
    }
  }, [placedPanels, segmentLengthCm, bounds]);

  return null;
}

/* Keyboard orbit hook */
function KeyboardOrbit() {
  const { camera, gl } = useThree();
  const keysDown = useRef(new Set<string>());

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    keysDown.current.add(e.key);
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    keysDown.current.delete(e.key);
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (parent) {
      parent.tabIndex = 0;
      parent.style.outline = "none";
    }

    const el = parent || canvas;
    el.addEventListener("keydown", onKeyDown);
    el.addEventListener("keyup", onKeyUp);
    return () => {
      el.removeEventListener("keydown", onKeyDown);
      el.removeEventListener("keyup", onKeyUp);
    };
  }, [gl.domElement, onKeyDown, onKeyUp]);

  useEffect(() => {
    const speed = 0.03;
    const zoomSpeed = 0.08;
    let raf: number;

    const loop = () => {
      const keys = keysDown.current;
      if (keys.size > 0) {
        const spherical = new THREE.Spherical().setFromVector3(
          camera.position.clone().sub(new THREE.Vector3(camera.position.x, 0, 0))
        );

        if (keys.has("ArrowLeft") || keys.has("a")) {
          camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
        }
        if (keys.has("ArrowRight") || keys.has("d")) {
          camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -speed);
        }
        if (keys.has("ArrowUp") || keys.has("w")) {
          camera.position.y += speed * 0.5;
        }
        if (keys.has("ArrowDown") || keys.has("s")) {
          camera.position.y -= speed * 0.5;
        }
        if (keys.has("+") || keys.has("=")) {
          camera.position.multiplyScalar(1 - zoomSpeed);
        }
        if (keys.has("-")) {
          camera.position.multiplyScalar(1 + zoomSpeed);
        }
        camera.lookAt(0, PANEL_H / 2, 0);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [camera]);

  return null;
}

/* Scene content */
function FenceScene({
  segmentLengthCm,
  placedPanels,
}: {
  segmentLengthCm: number;
  placedPanels: PlacedPanel[];
}) {
  const totalLength = segmentLengthCm * SCALE;

  const fenceElements = useMemo(() => {
    const els: React.ReactNode[] = [];
    let cursor = 0;

    els.push(<Post key="post-0" x={cursor + POST_W / 2} height={PANEL_H + 0.08} />);
    cursor += POST_W;

    placedPanels.forEach((p, i) => {
      const pw = p.widthCm * SCALE;
      els.push(
        <Panel
          key={`panel-${i}`}
          x={cursor + pw / 2}
          width={pw}
          height={PANEL_H}
          color={p.colorHex}
          styleId={p.panelStyleId}
        />,
      );
      cursor += pw;
      els.push(<Post key={`post-${i + 1}`} x={cursor + POST_W / 2} height={PANEL_H + 0.08} />);
      cursor += POST_W;
    });

    return els;
  }, [placedPanels]);

  const camTarget = useMemo(() => {
    const cx = totalLength / 2;
    return [cx, PANEL_H / 2, 0] as [number, number, number];
  }, [totalLength]);

  const camPos = useMemo(() => {
    const dist = Math.max(totalLength * 1.2, 3);
    return [totalLength / 2, PANEL_H * 0.8, dist] as [number, number, number];
  }, [totalLength]);

  return (
    <>
      <color attach="background" args={["#e8ede5"]} />
      <PerspectiveCamera makeDefault position={camPos} fov={40} />
      <OrbitControls
        target={camTarget}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={0.5}
        maxDistance={30}
        enableDamping
        dampingFactor={0.08}
      />
      <KeyboardOrbit />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} />

      <Bounds fit clip observe margin={1.3}>
        <AutoFit placedPanels={placedPanels} segmentLengthCm={segmentLengthCm} />
        <Ground length={totalLength} />
        {fenceElements}
      </Bounds>
    </>
  );
}

const ThreeDViewCanvas = ({ segmentLengthCm, segmentLabel, placedPanels }: ThreeDViewCanvasProps) => {
  return (
    <div className="w-full h-full min-h-[400px] relative flex flex-col" style={{ height: "100%" }}>
      {/* Overlay label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
        <p className="text-sm font-semibold text-foreground">
          Segment {segmentLabel} — {segmentLengthCm} cm
        </p>
        {placedPanels.length === 0 && (
          <p className="text-xs text-muted-foreground mt-0.5">Voeg panelen toe in 2D-weergave om ze hier te zien</p>
        )}
      </div>

      <Canvas
        shadows
        className="flex-1"
        style={{ width: "100%", height: "100%", minHeight: 400 }}
        gl={{ antialias: true, alpha: false }}
        resize={{ debounce: 100, scroll: false }}
      >
        <Suspense fallback={null}>
          <FenceScene segmentLengthCm={segmentLengthCm} placedPanels={placedPanels} />
        </Suspense>
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
        <p className="text-xs text-muted-foreground">
          🖱️ Sleep om te draaien · Scroll om te zoomen · ⌨️ WASD / pijltjes om te roteren · +/- om in/uit te zoomen
        </p>
      </div>
    </div>
  );
};

export default ThreeDViewCanvas;
