import { useState, useMemo, Suspense, useEffect, useRef, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Bounds, useBounds, Html } from "@react-three/drei";
import { PlacedPanel, PanelStyleId } from "./types";
import { POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";
import * as THREE from "three";
import { Sun, CloudFog } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ThreeDViewCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
}

const SCALE = 0.01;
const POST_W = POST_WIDTH_CM * SCALE;
const PANEL_H = PANEL_HEIGHT_CM * SCALE;
const POST_DEPTH = POST_W;
const PANEL_DEPTH = 0.04;
const POST_CAP_OVERHANG = 0.08 * SCALE * 100; // 8cm above panel

function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

/** Vary a color slightly for wood-grain effect */
function varyColor(base: THREE.Color, amount: number, seed: number): THREE.Color {
  const c = base.clone();
  const offset = (Math.sin(seed * 127.1) * 0.5 + 0.5) * amount * 2 - amount;
  c.r = Math.max(0, Math.min(1, c.r + offset));
  c.g = Math.max(0, Math.min(1, c.g + offset * 0.7));
  c.b = Math.max(0, Math.min(1, c.b + offset * 0.5));
  return c;
}

/* ── Ground with grass look ── */
function Ground() {
  return (
    <group>
      {/* Main grass plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#5a8a42" roughness={0.95} metalness={0} />
      </mesh>
      {/* Subtle grid overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.003, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.04} wireframe />
      </mesh>
      {/* Grid lines for spatial reference */}
      <gridHelper args={[40, 40, "#7aaa62", "#7aaa62"]} position={[0, -0.002, 0]}>
        <meshBasicMaterial transparent opacity={0.08} />
      </gridHelper>
    </group>
  );
}

/* ── Single fence post with cap and base ── */
function Post({ x, height }: { x: number; height: number }) {
  const totalHeight = height + POST_CAP_OVERHANG;
  return (
    <group position={[x, 0, 0]}>
      {/* Base plate */}
      <mesh position={[0, 0.005, 0]} castShadow receiveShadow>
        <boxGeometry args={[POST_W * 1.6, 0.01, POST_DEPTH * 1.6]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Main post body */}
      <mesh position={[0, totalHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[POST_W, totalHeight, POST_DEPTH]} />
        <meshPhysicalMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} clearcoat={0.3} clearcoatRoughness={0.4} />
      </mesh>
      {/* Post cap - flat cap with slight overhang */}
      <mesh position={[0, totalHeight + 0.008, 0]} castShadow>
        <boxGeometry args={[POST_W + 0.015, 0.016, POST_DEPTH + 0.015]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Cap pyramid top */}
      <mesh position={[0, totalHeight + 0.016 + 0.012, 0]} castShadow>
        <coneGeometry args={[(POST_W + 0.015) * 0.6, 0.024, 4]} />
        <meshPhysicalMaterial color="#222" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

/* ── Horizontal rail (top/bottom of panel) ── */
function Rail({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <mesh position={[x, y, 0]} castShadow>
      <boxGeometry args={[width, 0.02, PANEL_DEPTH + 0.005]} />
      <meshPhysicalMaterial color="#2a2a2a" roughness={0.35} metalness={0.7} />
    </mesh>
  );
}

/* ── Panel face with pattern ── */
function Panel({
  x, width, height, color, styleId,
}: {
  x: number; width: number; height: number; color: string; styleId: PanelStyleId;
}) {
  const threeColor = useMemo(() => hexToThreeColor(color), [color]);

  if (styleId === "horizontal-planks") {
    const plankCount = Math.floor(height / 0.12);
    const gap = 0.004;
    const plankH = (height - (plankCount - 1) * gap) / plankCount;
    return (
      <group position={[x, 0, 0]}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: plankCount }, (_, i) => {
          const py = i * (plankH + gap) + plankH / 2;
          const plankColor = varyColor(threeColor, 0.04, i * 3.7);
          return (
            <mesh key={i} position={[0, py, 0]} castShadow receiveShadow>
              <boxGeometry args={[width - 0.004, plankH - 0.002, PANEL_DEPTH]} />
              <meshPhysicalMaterial
                color={plankColor}
                roughness={0.75}
                metalness={0.02}
                clearcoat={0.15}
                clearcoatRoughness={0.6}
              />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (styleId === "vertical-slats") {
    const slatCount = Math.max(3, Math.floor(width / 0.1));
    const gap = 0.006;
    const slatW = (width - (slatCount - 1) * gap) / slatCount;
    return (
      <group position={[x, height / 2, 0]}>
        <Rail x={0} y={-height / 2 + 0.005} width={width} />
        <Rail x={0} y={height / 2 - 0.005} width={width} />
        {Array.from({ length: slatCount }, (_, i) => {
          const px = -width / 2 + i * (slatW + gap) + slatW / 2;
          const slatColor = varyColor(threeColor, 0.04, i * 5.3);
          return (
            <mesh key={i} position={[px, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[slatW, height - 0.025, PANEL_DEPTH]} />
              <meshPhysicalMaterial
                color={slatColor}
                roughness={0.75}
                metalness={0.02}
                clearcoat={0.15}
                clearcoatRoughness={0.6}
              />
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
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: louverCount }, (_, i) => {
          const py = i * (louverH + gap) + louverH / 2;
          const louverColor = varyColor(threeColor, 0.03, i * 2.1);
          return (
            <mesh key={i} position={[0, py, 0]} rotation={[0.18, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[width - 0.01, louverH, PANEL_DEPTH + 0.01]} />
              <meshPhysicalMaterial
                color={louverColor}
                roughness={0.6}
                metalness={0.08}
                clearcoat={0.2}
                clearcoatRoughness={0.5}
              />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (styleId === "decorative" || styleId === "mosaic") {
    // Semi-transparent mesh/wire pattern
    const gridX = styleId === "mosaic" ? 8 : 6;
    const gridY = styleId === "mosaic" ? 12 : 8;
    const cellW = width / gridX;
    const cellH = height / gridY;
    const wireWidth = 0.004;
    return (
      <group position={[x, 0, 0]}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {/* Vertical wires */}
        {Array.from({ length: gridX + 1 }, (_, i) => (
          <mesh key={`v-${i}`} position={[-width / 2 + i * cellW, height / 2, 0]} castShadow>
            <boxGeometry args={[wireWidth, height - 0.02, wireWidth]} />
            <meshPhysicalMaterial color={threeColor} roughness={0.4} metalness={0.6} />
          </mesh>
        ))}
        {/* Horizontal wires */}
        {Array.from({ length: gridY + 1 }, (_, i) => (
          <mesh key={`h-${i}`} position={[0, i * cellH, 0]} castShadow>
            <boxGeometry args={[width - 0.004, wireWidth, wireWidth]} />
            <meshPhysicalMaterial color={threeColor} roughness={0.4} metalness={0.6} />
          </mesh>
        ))}
        {/* Semi-transparent fill */}
        <mesh position={[0, height / 2, -0.005]}>
          <planeGeometry args={[width - 0.01, height - 0.02]} />
          <meshPhysicalMaterial color={threeColor} transparent opacity={0.15} roughness={0.5} metalness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  // Default solid panel
  return (
    <group position={[x, 0, 0]}>
      <Rail x={0} y={0.005} width={width} />
      <Rail x={0} y={height - 0.005} width={width} />
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height - 0.02, PANEL_DEPTH]} />
        <meshPhysicalMaterial
          color={threeColor}
          roughness={0.65}
          metalness={0.05}
          clearcoat={0.1}
          clearcoatRoughness={0.7}
        />
      </mesh>
    </group>
  );
}

/* ── Dimension line on ground ── */
function DimensionLine({ startX, endX }: { startX: number; endX: number }) {
  const midX = (startX + endX) / 2;
  const length = endX - startX;
  const arrowSize = 0.06;

  return (
    <group position={[0, 0.01, 1.2]}>
      {/* Line */}
      <mesh position={[midX, 0, 0]}>
        <boxGeometry args={[length, 0.005, 0.005]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      {/* Left arrow */}
      <mesh position={[startX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[arrowSize * 0.4, arrowSize, 3]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      {/* Right arrow */}
      <mesh position={[endX, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[arrowSize * 0.4, arrowSize, 3]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      {/* Label */}
      <Html position={[midX, 0.05, 0]} center style={{ pointerEvents: "none" }}>
        <div className="bg-background/90 px-2 py-0.5 rounded text-xs font-mono border border-border whitespace-nowrap">
          {(length / SCALE).toFixed(0)} cm
        </div>
      </Html>
    </group>
  );
}

/* ── Auto-fit camera to fence bounds on change ── */
function AutoFit({ placedPanels, segmentLengthCm }: { placedPanels: PlacedPanel[]; segmentLengthCm: number }) {
  const bounds = useBounds();
  const prevKey = useRef("");

  useEffect(() => {
    const key = `${segmentLengthCm}-${placedPanels.length}-${placedPanels.map((p) => p.widthCm).join(",")}`;
    if (key !== prevKey.current) {
      prevKey.current = key;
      const t = setTimeout(() => bounds.refresh().fit(), 100);
      return () => clearTimeout(t);
    }
  }, [placedPanels, segmentLengthCm, bounds]);

  return null;
}

/* ── Keyboard orbit hook ── */
function KeyboardOrbit() {
  const { camera, gl } = useThree();
  const keysDown = useRef(new Set<string>());

  const onKeyDown = useCallback((e: KeyboardEvent) => { keysDown.current.add(e.key); }, []);
  const onKeyUp = useCallback((e: KeyboardEvent) => { keysDown.current.delete(e.key); }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (parent) { parent.tabIndex = 0; parent.style.outline = "none"; }
    const el = parent || canvas;
    el.addEventListener("keydown", onKeyDown);
    el.addEventListener("keyup", onKeyUp);
    return () => { el.removeEventListener("keydown", onKeyDown); el.removeEventListener("keyup", onKeyUp); };
  }, [gl.domElement, onKeyDown, onKeyUp]);

  useFrame(() => {
    const keys = keysDown.current;
    if (keys.size === 0) return;
    const speed = 0.025;
    const zoomSpeed = 0.06;
    if (keys.has("ArrowLeft") || keys.has("a")) camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
    if (keys.has("ArrowRight") || keys.has("d")) camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -speed);
    if (keys.has("ArrowUp") || keys.has("w")) camera.position.y += speed * 0.4;
    if (keys.has("ArrowDown") || keys.has("s")) camera.position.y = Math.max(0.2, camera.position.y - speed * 0.4);
    if (keys.has("+") || keys.has("=")) camera.position.multiplyScalar(1 - zoomSpeed);
    if (keys.has("-")) camera.position.multiplyScalar(1 + zoomSpeed);
    camera.lookAt(0, PANEL_H * 0.4, 0);
  });

  return null;
}

/* ── Scene content ── */
function FenceScene({
  segmentLengthCm,
  placedPanels,
  sunAngle,
}: {
  segmentLengthCm: number;
  placedPanels: PlacedPanel[];
  sunAngle: number;
}) {
  const totalLength = segmentLengthCm * SCALE;
  const postHeight = PANEL_H + POST_CAP_OVERHANG;

  const fenceElements = useMemo(() => {
    const els: React.ReactNode[] = [];
    let cursor = 0;

    els.push(<Post key="post-0" x={cursor + POST_W / 2} height={PANEL_H} />);
    cursor += POST_W;

    placedPanels.forEach((p, i) => {
      const pw = p.widthCm * SCALE;
      els.push(
        <Panel key={`panel-${i}`} x={cursor + pw / 2} width={pw} height={PANEL_H} color={p.colorHex} styleId={p.panelStyleId} />,
      );
      cursor += pw;
      els.push(<Post key={`post-${i + 1}`} x={cursor + POST_W / 2} height={PANEL_H} />);
      cursor += POST_W;
    });

    return els;
  }, [placedPanels]);

  // Center the fence at origin
  const fenceWidth = useMemo(() => {
    const panelsW = placedPanels.reduce((s, p) => s + p.widthCm * SCALE, 0);
    return panelsW + (placedPanels.length + 1) * POST_W;
  }, [placedPanels]);

  const camTarget = useMemo(() => [0, PANEL_H * 0.4, 0] as [number, number, number], []);
  const camPos = useMemo(() => {
    const dist = Math.max(totalLength * 1.1, 3.5);
    return [dist * 0.7, PANEL_H * 1.5 + 1, dist * 0.8] as [number, number, number];
  }, [totalLength]);

  return (
    <>
      {/* Sky gradient background */}
      <color attach="background" args={["#c8dce8"]} />
      <fog attach="fog" args={["#c8dce8", 15, 50]} />

      <PerspectiveCamera makeDefault position={camPos} fov={35} near={0.1} far={100} />
      <OrbitControls
        target={camTarget}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={0.1}
        minDistance={0.8}
        maxDistance={25}
        enableDamping
        dampingFactor={0.06}
      />
      <KeyboardOrbit />

      {/* Lighting - dynamic sun */}
      {(() => {
        const angle = sunAngle * Math.PI;
        const radius = 12;
        const sx = radius * Math.cos(angle);
        const sz = radius * Math.sin(angle);
        const sy = 10 + 2 * Math.sin(angle);
        const intensity = 1.8 - sunAngle * 1.4; // 1.8 → 0.4
        const ambientBoost = 0.15 + sunAngle * 0.35; // 0.15 → 0.5
        return (
          <>
            <hemisphereLight args={["#87ceeb", "#4a7c3f", 0.4]} />
            <ambientLight intensity={ambientBoost} />
            <directionalLight
              position={[sx, sy, sz]}
              intensity={intensity}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={60}
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
              shadow-bias={-0.001 - sunAngle * 0.002}
            />
            <directionalLight position={[-sx * 0.3, 6, -sz * 0.3]} intensity={0.3} />
          </>
        );
      })()}

      <Bounds fit clip observe margin={1.6}>
        <AutoFit placedPanels={placedPanels} segmentLengthCm={segmentLengthCm} />
        {/* Offset fence so it's centered */}
        <group position={[-fenceWidth / 2, 0, 0]}>
          {fenceElements}
          {placedPanels.length > 0 && (
            <DimensionLine startX={0} endX={fenceWidth} />
          )}
        </group>
      </Bounds>

      <Ground />
    </>
  );
}

const ThreeDViewCanvas = ({ segmentLengthCm, segmentLabel, placedPanels }: ThreeDViewCanvasProps) => {
  const [sunAngle, setSunAngle] = useState([0.25]);

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

      {/* Sun direction slider */}
      <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-border flex items-center gap-3 min-w-[200px]">
        <Sun className="h-5 w-5 text-amber-500 shrink-0" />
        <Slider
          value={sunAngle}
          onValueChange={setSunAngle}
          min={0}
          max={1}
          step={0.01}
          className="flex-1"
        />
        <CloudFog className="h-5 w-5 text-muted-foreground shrink-0" />
      </div>

      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        className="flex-1"
        style={{ width: "100%", height: "100%", minHeight: 400 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        resize={{ debounce: 100, scroll: false }}
      >
        <Suspense fallback={null}>
          <FenceScene segmentLengthCm={segmentLengthCm} placedPanels={placedPanels} sunAngle={sunAngle[0]} />
        </Suspense>
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
        <p className="text-xs text-muted-foreground">
          🖱️ Sleep om te draaien · Scroll om te zoomen · ⌨️ WASD / pijltjes · +/- zoom
        </p>
      </div>
    </div>
  );
};

export default ThreeDViewCanvas;
