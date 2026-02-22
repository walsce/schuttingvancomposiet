import { useState, useMemo, Suspense, useEffect, useRef, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Bounds, useBounds, Html } from "@react-three/drei";
import { PlacedPanel, PanelStyleId } from "./types";
import { POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";
import * as THREE from "three";
import { Sun, CloudFog, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";

interface ThreeDViewCanvasProps {
  segmentLengthCm: number;
  segmentLabel: string;
  placedPanels: PlacedPanel[];
  onAddPanel?: () => void;
  onRemovePanel?: (id: string) => void;
  onReorderPanels?: (panels: PlacedPanel[]) => void;
}

const SCALE = 0.01;
const POST_W = POST_WIDTH_CM * SCALE;
const PANEL_H = PANEL_HEIGHT_CM * SCALE;
const POST_DEPTH = POST_W;
const PANEL_DEPTH = 0.04;
const POST_CAP_OVERHANG = 0.08 * SCALE * 100;

function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#5a8a42" roughness={0.95} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.003, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.04} wireframe />
      </mesh>
      <gridHelper args={[40, 40, "#7aaa62", "#7aaa62"]} position={[0, -0.002, 0]}>
        <meshBasicMaterial transparent opacity={0.08} />
      </gridHelper>
    </group>
  );
}

/* ── Single fence post ── */
function Post({ x, height }: { x: number; height: number }) {
  const totalHeight = height + POST_CAP_OVERHANG;
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.005, 0]} castShadow receiveShadow>
        <boxGeometry args={[POST_W * 1.6, 0.01, POST_DEPTH * 1.6]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, totalHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[POST_W, totalHeight, POST_DEPTH]} />
        <meshPhysicalMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} clearcoat={0.3} clearcoatRoughness={0.4} />
      </mesh>
      <mesh position={[0, totalHeight + 0.008, 0]} castShadow>
        <boxGeometry args={[POST_W + 0.015, 0.016, POST_DEPTH + 0.015]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0, totalHeight + 0.016 + 0.012, 0]} castShadow>
        <coneGeometry args={[(POST_W + 0.015) * 0.6, 0.024, 4]} />
        <meshPhysicalMaterial color="#222" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

/* ── Rail ── */
function Rail({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <mesh position={[x, y, 0]} castShadow>
      <boxGeometry args={[width, 0.02, PANEL_DEPTH + 0.005]} />
      <meshPhysicalMaterial color="#2a2a2a" roughness={0.35} metalness={0.7} />
    </mesh>
  );
}

/* ── Interactive Panel ── */
function Panel({
  x, width, height, color, styleId,
  isSelected, isHovered, onPointerOver, onPointerOut, onClick,
}: {
  x: number; width: number; height: number; color: string; styleId: PanelStyleId;
  isSelected?: boolean; isHovered?: boolean;
  onPointerOver?: () => void; onPointerOut?: () => void; onClick?: () => void;
}) {
  const threeColor = useMemo(() => hexToThreeColor(color), [color]);
  const emissiveColor = useMemo(() => new THREE.Color(isSelected ? "#4488ff" : isHovered ? "#6699ff" : "#000000"), [isSelected, isHovered]);
  const emissiveIntensity = isSelected ? 0.3 : isHovered ? 0.15 : 0;

  const interactionProps = {
    onPointerOver: (e: any) => { e.stopPropagation(); onPointerOver?.(); },
    onPointerOut: (e: any) => { e.stopPropagation(); onPointerOut?.(); },
    onClick: (e: any) => { e.stopPropagation(); onClick?.(); },
  };

  // Aluminium solid panel
  if (styleId === "aluminium") {
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[width - 0.004, height - 0.02, PANEL_DEPTH]} />
          <meshPhysicalMaterial color={threeColor} roughness={0.2} metalness={0.9} clearcoat={0.5} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
        </mesh>
      </group>
    );
  }

  // Lamellen 45mm
  if (styleId === "lamellen-45") {
    const slatH = 0.045;
    const gap = 0.015;
    const count = Math.floor(height / (slatH + gap));
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: count }, (_, i) => (
          <mesh key={i} position={[0, i * (slatH + gap) + slatH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[width - 0.01, slatH, PANEL_DEPTH]} />
            <meshPhysicalMaterial color={varyColor(threeColor, 0.02, i)} roughness={0.25} metalness={0.85} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
          </mesh>
        ))}
      </group>
    );
  }

  // Lamellen 100mm
  if (styleId === "lamellen-100") {
    const slatH = 0.1;
    const gap = 0.015;
    const count = Math.floor(height / (slatH + gap));
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: count }, (_, i) => (
          <mesh key={i} position={[0, i * (slatH + gap) + slatH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[width - 0.01, slatH, PANEL_DEPTH]} />
            <meshPhysicalMaterial color={varyColor(threeColor, 0.02, i)} roughness={0.25} metalness={0.85} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
          </mesh>
        ))}
      </group>
    );
  }

  // Rhombus lamellen
  if (styleId === "rhombus-lamellen") {
    const slatH = 0.07;
    const gap = 0.01;
    const count = Math.floor(height / (slatH + gap));
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: count }, (_, i) => (
          <mesh key={i} position={[0, i * (slatH + gap) + slatH / 2, 0]} rotation={[0.12, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[width - 0.01, slatH, PANEL_DEPTH + 0.005]} />
            <meshPhysicalMaterial color={varyColor(threeColor, 0.03, i)} roughness={0.3} metalness={0.8} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
          </mesh>
        ))}
      </group>
    );
  }

  // Glass panel
  if (styleId === "glass-panel") {
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[width - 0.004, height - 0.02, 0.012]} />
          <meshPhysicalMaterial color="#c8dce8" roughness={0.1} metalness={0.0} transparent opacity={0.45} clearcoat={1} clearcoatRoughness={0.1} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
        </mesh>
      </group>
    );
  }

  // Solar panel
  if (styleId === "solar-panel") {
    const cellRows = 6;
    const cellCols = 3;
    const cellW = (width - 0.02) / cellCols;
    const cellH = (height - 0.04) / cellRows;
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {/* Dark backing */}
        <mesh position={[0, height / 2, -0.005]}>
          <boxGeometry args={[width - 0.004, height - 0.02, 0.01]} />
          <meshPhysicalMaterial color="#0a0a15" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Solar cells */}
        {Array.from({ length: cellRows }, (_, row) =>
          Array.from({ length: cellCols }, (_, col) => (
            <mesh key={`${row}-${col}`} position={[-width / 2 + 0.01 + col * cellW + cellW / 2, 0.02 + row * cellH + cellH / 2, 0.002]} castShadow>
              <boxGeometry args={[cellW - 0.006, cellH - 0.006, 0.004]} />
              <meshPhysicalMaterial color="#1a3388" roughness={0.15} metalness={0.4} clearcoat={0.8} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
            </mesh>
          ))
        ).flat()}
      </group>
    );
  }

  if (styleId === "horizontal-planks") {
    const plankCount = Math.floor(height / 0.12);
    const gap = 0.004;
    const plankH = (height - (plankCount - 1) * gap) / plankCount;
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: plankCount }, (_, i) => {
          const py = i * (plankH + gap) + plankH / 2;
          const plankColor = varyColor(threeColor, 0.04, i * 3.7);
          return (
            <mesh key={i} position={[0, py, 0]} castShadow receiveShadow>
              <boxGeometry args={[width - 0.004, plankH - 0.002, PANEL_DEPTH]} />
              <meshPhysicalMaterial color={plankColor} roughness={0.75} metalness={0.02} clearcoat={0.15} clearcoatRoughness={0.6} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
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
      <group position={[x, height / 2, 0]} {...interactionProps}>
        <Rail x={0} y={-height / 2 + 0.005} width={width} />
        <Rail x={0} y={height / 2 - 0.005} width={width} />
        {Array.from({ length: slatCount }, (_, i) => {
          const px = -width / 2 + i * (slatW + gap) + slatW / 2;
          const slatColor = varyColor(threeColor, 0.04, i * 5.3);
          return (
            <mesh key={i} position={[px, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[slatW, height - 0.025, PANEL_DEPTH]} />
              <meshPhysicalMaterial color={slatColor} roughness={0.75} metalness={0.02} clearcoat={0.15} clearcoatRoughness={0.6} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
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
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: louverCount }, (_, i) => {
          const py = i * (louverH + gap) + louverH / 2;
          const louverColor = varyColor(threeColor, 0.03, i * 2.1);
          return (
            <mesh key={i} position={[0, py, 0]} rotation={[0.18, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[width - 0.01, louverH, PANEL_DEPTH + 0.01]} />
              <meshPhysicalMaterial color={louverColor} roughness={0.6} metalness={0.08} clearcoat={0.2} clearcoatRoughness={0.5} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (styleId === "decorative" || styleId === "mosaic") {
    const gridX = styleId === "mosaic" ? 8 : 6;
    const gridY = styleId === "mosaic" ? 12 : 8;
    const cellW = width / gridX;
    const cellH = height / gridY;
    const wireWidth = 0.004;
    return (
      <group position={[x, 0, 0]} {...interactionProps}>
        <Rail x={0} y={0.005} width={width} />
        <Rail x={0} y={height - 0.005} width={width} />
        {Array.from({ length: gridX + 1 }, (_, i) => (
          <mesh key={`v-${i}`} position={[-width / 2 + i * cellW, height / 2, 0]} castShadow>
            <boxGeometry args={[wireWidth, height - 0.02, wireWidth]} />
            <meshPhysicalMaterial color={threeColor} roughness={0.4} metalness={0.6} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
          </mesh>
        ))}
        {Array.from({ length: gridY + 1 }, (_, i) => (
          <mesh key={`h-${i}`} position={[0, i * cellH, 0]} castShadow>
            <boxGeometry args={[width - 0.004, wireWidth, wireWidth]} />
            <meshPhysicalMaterial color={threeColor} roughness={0.4} metalness={0.6} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
          </mesh>
        ))}
        <mesh position={[0, height / 2, -0.005]}>
          <planeGeometry args={[width - 0.01, height - 0.02]} />
          <meshPhysicalMaterial color={threeColor} transparent opacity={0.15} roughness={0.5} metalness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  // Default solid panel
  return (
    <group position={[x, 0, 0]} {...interactionProps}>
      <Rail x={0} y={0.005} width={width} />
      <Rail x={0} y={height - 0.005} width={width} />
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height - 0.02, PANEL_DEPTH]} />
        <meshPhysicalMaterial color={threeColor} roughness={0.65} metalness={0.05} clearcoat={0.1} clearcoatRoughness={0.7} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
      </mesh>
    </group>
  );
}

/* ── Dimension line ── */
function DimensionLine({ startX, endX }: { startX: number; endX: number }) {
  const midX = (startX + endX) / 2;
  const length = endX - startX;
  const arrowSize = 0.06;
  return (
    <group position={[0, 0.01, 1.2]}>
      <mesh position={[midX, 0, 0]}>
        <boxGeometry args={[length, 0.005, 0.005]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      <mesh position={[startX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[arrowSize * 0.4, arrowSize, 3]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      <mesh position={[endX, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[arrowSize * 0.4, arrowSize, 3]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      <Html position={[midX, 0.05, 0]} center style={{ pointerEvents: "none" }}>
        <div className="bg-background/90 px-2 py-0.5 rounded text-xs font-mono border border-border whitespace-nowrap">
          {(length / SCALE).toFixed(0)} cm
        </div>
      </Html>
    </group>
  );
}

/* ── Auto-fit camera ── */
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

/* ── Keyboard orbit ── */
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

/* ── Add panel button in 3D ── */
function AddPanelZone({ x, height, onAdd }: { x: number; height: number; onAdd?: () => void }) {
  const [hovered, setHovered] = useState(false);
  if (!onAdd) return null;
  return (
    <group position={[x, height / 2, 0.15]}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onAdd(); }}
      >
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <Html center style={{ pointerEvents: "none" }}>
        <div className={`rounded-full p-2 border-2 transition-colors ${hovered ? "bg-primary text-primary-foreground border-primary" : "bg-background/90 text-muted-foreground border-border"}`}>
          <Plus className="w-5 h-5" />
        </div>
      </Html>
    </group>
  );
}

/* ── Scene content ── */
function FenceScene({
  segmentLengthCm,
  placedPanels,
  sunAngle,
  selectedPanelId,
  hoveredPanelId,
  onPanelClick,
  onPanelHover,
  onPanelLeave,
  onAddPanel,
}: {
  segmentLengthCm: number;
  placedPanels: PlacedPanel[];
  sunAngle: number;
  selectedPanelId: string | null;
  hoveredPanelId: string | null;
  onPanelClick: (id: string) => void;
  onPanelHover: (id: string) => void;
  onPanelLeave: () => void;
  onAddPanel?: () => void;
}) {
  const totalLength = segmentLengthCm * SCALE;

  const { fenceElements, fenceWidth, addZoneX } = useMemo(() => {
    const els: React.ReactNode[] = [];
    let cursor = 0;
    els.push(<Post key="post-0" x={cursor + POST_W / 2} height={PANEL_H} />);
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
          isSelected={selectedPanelId === p.id}
          isHovered={hoveredPanelId === p.id}
          onClick={() => onPanelClick(p.id)}
          onPointerOver={() => onPanelHover(p.id)}
          onPointerOut={onPanelLeave}
        />,
      );
      cursor += pw;
      els.push(<Post key={`post-${i + 1}`} x={cursor + POST_W / 2} height={PANEL_H} />);
      cursor += POST_W;
    });
    const panelsW = placedPanels.reduce((s, p) => s + p.widthCm * SCALE, 0);
    const fw = panelsW + (placedPanels.length + 1) * POST_W;
    return { fenceElements: els, fenceWidth: fw, addZoneX: cursor + 0.3 };
  }, [placedPanels, selectedPanelId, hoveredPanelId, onPanelClick, onPanelHover, onPanelLeave]);

  const camTarget = useMemo(() => [0, PANEL_H * 0.4, 0] as [number, number, number], []);
  const camPos = useMemo(() => {
    const dist = Math.max(totalLength * 1.1, 3.5);
    return [dist * 0.7, PANEL_H * 1.5 + 1, dist * 0.8] as [number, number, number];
  }, [totalLength]);

  return (
    <>
      <color attach="background" args={["#c8dce8"]} />
      <fog attach="fog" args={["#c8dce8", 15, 50]} />
      <PerspectiveCamera makeDefault position={camPos} fov={35} near={0.1} far={100} />
      <OrbitControls target={camTarget} maxPolarAngle={Math.PI / 2 - 0.05} minPolarAngle={0.1} minDistance={0.8} maxDistance={25} enableDamping dampingFactor={0.06} />
      <KeyboardOrbit />

      {(() => {
        const angle = sunAngle * Math.PI;
        const radius = 12;
        const sx = radius * Math.cos(angle);
        const sz = radius * Math.sin(angle);
        const sy = 10 + 2 * Math.sin(angle);
        const intensity = 1.8 - sunAngle * 1.4;
        const ambientBoost = 0.15 + sunAngle * 0.35;
        return (
          <>
            <hemisphereLight args={["#87ceeb", "#4a7c3f", 0.4]} />
            <ambientLight intensity={ambientBoost} />
            <directionalLight position={[sx, sy, sz]} intensity={intensity} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-far={60} shadow-camera-left={-15} shadow-camera-right={15} shadow-camera-top={15} shadow-camera-bottom={-15} shadow-bias={-0.001 - sunAngle * 0.002} />
            <directionalLight position={[-sx * 0.3, 6, -sz * 0.3]} intensity={0.3} />
          </>
        );
      })()}

      <Bounds fit clip observe margin={1.6}>
        <AutoFit placedPanels={placedPanels} segmentLengthCm={segmentLengthCm} />
        <group position={[-fenceWidth / 2, 0, 0]}>
          {fenceElements}
          {placedPanels.length > 0 && <DimensionLine startX={0} endX={fenceWidth} />}
          <AddPanelZone x={addZoneX} height={PANEL_H} onAdd={onAddPanel} />
        </group>
      </Bounds>
      <Ground />
    </>
  );
}

const ThreeDViewCanvas = ({ segmentLengthCm, segmentLabel, placedPanels, onAddPanel, onRemovePanel, onReorderPanels }: ThreeDViewCanvasProps) => {
  const [sunAngle, setSunAngle] = useState([0.25]);
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);
  const [hoveredPanelId, setHoveredPanelId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handlePanelClick = useCallback((id: string) => {
    setSelectedPanelId((prev) => (prev === id ? null : id));
  }, []);

  const selectedIndex = useMemo(() => placedPanels.findIndex((p) => p.id === selectedPanelId), [placedPanels, selectedPanelId]);

  const handleMoveLeft = useCallback(() => {
    if (selectedIndex <= 0 || !onReorderPanels) return;
    const arr = [...placedPanels];
    [arr[selectedIndex - 1], arr[selectedIndex]] = [arr[selectedIndex], arr[selectedIndex - 1]];
    onReorderPanels(arr);
  }, [selectedIndex, placedPanels, onReorderPanels]);

  const handleMoveRight = useCallback(() => {
    if (selectedIndex < 0 || selectedIndex >= placedPanels.length - 1 || !onReorderPanels) return;
    const arr = [...placedPanels];
    [arr[selectedIndex], arr[selectedIndex + 1]] = [arr[selectedIndex + 1], arr[selectedIndex]];
    onReorderPanels(arr);
  }, [selectedIndex, placedPanels, onReorderPanels]);

  const handleDelete = useCallback(() => {
    if (selectedPanelId && onRemovePanel) {
      onRemovePanel(selectedPanelId);
      setSelectedPanelId(null);
    }
  }, [selectedPanelId, onRemovePanel]);

  const interactive = !!(onAddPanel || onRemovePanel || onReorderPanels);

  return (
    <div className="w-full h-full min-h-[400px] relative flex flex-col" style={{ height: "100%" }}>
      {/* Overlay label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
        <p className="text-sm font-semibold text-foreground">
          Segment {segmentLabel} — {segmentLengthCm} cm
        </p>
        {placedPanels.length === 0 && interactive && (
          <p className="text-xs text-muted-foreground mt-0.5">Klik op + om een paneel toe te voegen</p>
        )}
        {placedPanels.length === 0 && !interactive && (
          <p className="text-xs text-muted-foreground mt-0.5">Voeg panelen toe in 2D-weergave om ze hier te zien</p>
        )}
      </div>

      {/* Sun direction slider */}
      <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-border flex items-center gap-3 min-w-[200px]">
        <Sun className="h-5 w-5 text-amber-500 shrink-0" />
        <Slider value={sunAngle} onValueChange={setSunAngle} min={0} max={1} step={0.01} className="flex-1" />
        <CloudFog className="h-5 w-5 text-muted-foreground shrink-0" />
      </div>

      {/* Selected panel controls */}
      {selectedPanelId && interactive && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border flex items-center gap-2">
          <button onClick={handleMoveLeft} disabled={selectedIndex <= 0} className="p-1.5 rounded hover:bg-muted disabled:opacity-30">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="p-1.5 rounded hover:bg-destructive/10 text-destructive">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={handleMoveRight} disabled={selectedIndex >= placedPanels.length - 1} className="p-1.5 rounded hover:bg-muted disabled:opacity-30">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        className="flex-1"
        style={{ width: "100%", height: "100%", minHeight: 400 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        resize={{ debounce: 100, scroll: false }}
      >
        <Suspense fallback={null}>
          <FenceScene
            segmentLengthCm={segmentLengthCm}
            placedPanels={placedPanels}
            sunAngle={sunAngle[0]}
            selectedPanelId={selectedPanelId}
            hoveredPanelId={hoveredPanelId}
            onPanelClick={handlePanelClick}
            onPanelHover={setHoveredPanelId}
            onPanelLeave={() => setHoveredPanelId(null)}
            onAddPanel={onAddPanel}
          />
        </Suspense>
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
        <p className="text-xs text-muted-foreground">
          {interactive ? "🖱️ Klik paneel om te selecteren · " : ""}🖱️ Sleep om te draaien · Scroll om te zoomen
        </p>
      </div>
    </div>
  );
};

export default ThreeDViewCanvas;
