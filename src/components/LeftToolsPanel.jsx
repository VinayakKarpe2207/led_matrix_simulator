import {
  Pencil,
  Eraser,
  Droplet,
  MousePointer2,
  ChevronLeft,
  ChevronRight,
  FlipHorizontal,
  FlipVertical,
} from "lucide-react";

import useMatrixStore from "../store/useMatrixStore";
import { useState } from "react";

export default function LeftToolsPanel({ collapsed, setCollapsed }) {
  const selectedColor = useMatrixStore((s) => s.selectedColor);
  const setSelectedColor = useMatrixStore((s) => s.setSelectedColor);

  const [tool, setTool] = useState("pencil");
  const [mirrorH, setMirrorH] = useState(false);
  const [mirrorV, setMirrorV] = useState(false);

  const presetColors = [
    "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#ff4dff",
    "#00ffff", "#ff8000",
    "#ffffff", "#000000"
  ];

  return (
    <div className="h-full flex flex-col justify-between py-4 px-2 relative">

      {/* COLLAPSE BUTTON */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-6 w-8 h-8 rounded-full 
                   bg-white/10 backdrop-blur-md border border-[rgba(0,234,255,0.3)]
                   flex items-center justify-center text-[#00eaff]
                   shadow-[0_0_8px_#00eaff] hover:bg-white/20 transition"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* TOP TOOL ICONS */}
      <div className="flex flex-col gap-4 mt-6 items-center">

        {/* Pencil */}
        <ToolButton
          icon={<Pencil size={22} />}
          active={tool === "pencil"}
          collapsed={collapsed}
          label="Pencil"
          onClick={() => setTool("pencil")}
        />

        {/* Eraser */}
        <ToolButton
          icon={<Eraser size={22} />}
          active={tool === "eraser"}
          collapsed={collapsed}
          label="Eraser"
          onClick={() => setTool("eraser")}
        />

        {/* Eyedropper */}
        <ToolButton
          icon={<Droplet size={22} />}
          active={tool === "eyedropper"}
          collapsed={collapsed}
          label="Eyedropper"
          onClick={() => setTool("eyedropper")}
        />

        {/* Select (future) */}
        <ToolButton
          icon={<MousePointer2 size={22} />}
          active={tool === "select"}
          collapsed={collapsed}
          label="Select"
          onClick={() => setTool("select")}
        />
      </div>

      {/* COLOR PICKER + PALETTE */}
      {!collapsed && (
        <div className="px-3">

          {/* Selected Color Preview */}
          <div
            className="w-full h-10 rounded border border-[rgba(0,234,255,0.3)] 
                       shadow-[0_0_8px_#00eaff] mb-4"
            style={{ backgroundColor: selectedColor }}
          />

          {/* Color Picker */}
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full h-12 rounded cursor-pointer mb-4 
                       border border-[rgba(0,234,255,0.3)]
                       shadow-[0_0_6px_#00eaff]"
          />

          {/* Preset Colors */}
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((color, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded shadow-[0_0_6px_#00eaff] border border-[#00eaff40]"
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* MIRROR TOOLS */}
      <div className="flex flex-col gap-4 items-center mb-8">

        <ToolButton
          icon={<FlipHorizontal size={22} />}
          active={mirrorH}
          collapsed={collapsed}
          label="Mirror H"
          onClick={() => setMirrorH(!mirrorH)}
        />

        <ToolButton
          icon={<FlipVertical size={22} />}
          active={mirrorV}
          collapsed={collapsed}
          label="Mirror V"
          onClick={() => setMirrorV(!mirrorV)}
        />
      </div>
    </div>
  );
}


/* REUSABLE TOOL BUTTON COMPONENT */
function ToolButton({ icon, active, collapsed, label, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        flex items-center gap-3 px-3 py-2 w-full rounded-lg transition
        border ${active ? "border-[#00eaff80]" : "border-transparent"}
        ${active ? "text-[#00eaff] shadow-[0_0_8px_#00eaff]" : "text-gray-300"}
        hover:bg-white/10
        ${collapsed ? "justify-center" : ""}
      `}
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </button>
  );
}
