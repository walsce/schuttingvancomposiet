import { useRef, useState } from "react";
import { Upload, Image, X, ZoomIn, ZoomOut, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FloorPlanUploadProps {
  imageUrl: string | null;
  opacity: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  onImageChange: (url: string | null) => void;
  onOpacityChange: (v: number) => void;
  onScaleChange: (v: number) => void;
  onOffsetXChange: (v: number) => void;
  onOffsetYChange: (v: number) => void;
}

const FloorPlanUpload = ({
  imageUrl,
  opacity,
  scale,
  offsetX,
  offsetY,
  onImageChange,
  onOpacityChange,
  onScaleChange,
  onOffsetXChange,
  onOffsetYChange,
}: FloorPlanUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onImageChange(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {!imageUrl ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/10"
              : "border-border bg-card hover:border-primary/40"
          }`}
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground text-center">
            Sleep een plattegrond hierheen of klik om te uploaden
          </span>
          <span className="text-[10px] text-muted-foreground">PNG, JPG, SVG</span>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Preview & remove */}
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img src={imageUrl} alt="Plattegrond" className="w-full h-24 object-cover" />
            <button
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="absolute bottom-1 left-1 bg-background/80 rounded px-1.5 py-0.5 flex items-center gap-1">
              <Image className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-medium">Plattegrond actief</span>
            </div>
          </div>

          {/* Opacity */}
          <div>
            <Label className="text-[10px] text-muted-foreground mb-1 block">Transparantie: {Math.round(opacity * 100)}%</Label>
            <Slider value={[opacity]} onValueChange={([v]) => onOpacityChange(v)} min={0.1} max={1} step={0.05} />
          </div>

          {/* Scale */}
          <div>
            <Label className="text-[10px] text-muted-foreground mb-1 block flex items-center gap-1">
              <ZoomIn className="h-3 w-3" /> Schaal: {Math.round(scale * 100)}%
            </Label>
            <Slider value={[scale]} onValueChange={([v]) => onScaleChange(v)} min={0.2} max={3} step={0.05} />
          </div>

          {/* Position offsets */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block flex items-center gap-1">
                <Move className="h-3 w-3" /> X-positie
              </Label>
              <Slider value={[offsetX]} onValueChange={([v]) => onOffsetXChange(v)} min={-300} max={300} step={5} />
            </div>
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block">Y-positie</Label>
              <Slider value={[offsetY]} onValueChange={([v]) => onOffsetYChange(v)} min={-300} max={300} step={5} />
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => inputRef.current?.click()}>
            Andere afbeelding kiezen
          </Button>
        </div>
      )}
    </div>
  );
};

export default FloorPlanUpload;
