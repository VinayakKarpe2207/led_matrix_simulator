import useMatrixStore from "../store/useMatrixStore";
import { Undo2, Redo2, PaintBucket, Shapes } from "lucide-react";

export default function CanvasToolsPanel() {
  const setTool = useMatrixStore((s) => s.setTool);
  const shapeType = useMatrixStore((s) => s.shapeType);
  const setShapeType = useMatrixStore((s) => s.setShapeType);

  const undo = useMatrixStore((s) => s.undo);
  const redo = useMatrixStore((s) => s.redo);

  const shapeSize = useMatrixStore((s) => s.shapeSize);
  const setShapeSize = useMatrixStore((s) => s.setShapeSize);

  const shapes = [
    "square",
    "circle",
    "line",
    "triangle",
    "diamond",
    "arrow",
    "heart",
    "star",
  ];

  return (
    <div
      className="
        w-full flex items-center justify-center gap-6 
        py-3 bg-black/20 border-t border-gray-700
      "
    >
      {/* Fill Tool */}
      <button
        onClick={() => setTool("fill")}
        className="
          px-4 py-2 rounded border border-gray-600 
          hover:bg-white/10 transition
          text-white flex items-center gap-2
        "
      >
        <PaintBucket size={18} /> Fill
      </button>

      {/* Shape Dropdown */}
      <div className="flex items-center gap-2">
        <Shapes size={18} className="text-white" />
        <select
          className="
            bg-black/40 border border-gray-600 rounded px-3 py-1 text-white
          "
          value={shapeType}
          onChange={(e) => {
            setTool("shape");
            setShapeType(e.target.value);
          }}
        >
          {shapes.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Shape Size Slider */}
      <div className="flex items-center gap-3 text-white">
        Size
        <input
          type="range"
          min="1"
          max="20"
          value={shapeSize}
          onChange={(e) => setShapeSize(Number(e.target.value))}
          className="accent-cyan-400"
        />
      </div>

      {/* Undo */}
      <button
        onClick={undo}
        className="
          px-4 py-2 rounded border border-gray-600 
          hover:bg-white/10 transition text-white
        "
      >
        <Undo2 size={18} />
      </button>

      {/* Redo */}
      <button
        onClick={redo}
        className="
          px-4 py-2 rounded border border-gray-600 
          hover:bg-white/10 transition text-white
        "
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
}
