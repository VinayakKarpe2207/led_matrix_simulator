import { useState, useEffect, useRef } from "react";
import useMatrixStore from "../store/useMatrixStore";

export default function MatrixCanvas() {
  const rows = useMatrixStore((s) => s.rows);
  const cols = useMatrixStore((s) => s.cols);
  const frames = useMatrixStore((s) => s.frames);
  const currentFrame = useMatrixStore((s) => s.currentFrame);
  const togglePixel = useMatrixStore((s) => s.togglePixel);
  const selectedColor = useMatrixStore((s) => s.selectedColor);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isRightClick, setIsRightClick] = useState(false);
  const [pixelSize, setPixelSize] = useState(20);
  const canvasRef = useRef(null);

  // Listen for zoom slider from Editor.jsx
  useEffect(() => {
    const slider = document.getElementById("matrix-zoom");
    if (slider) {
      const handler = () => setPixelSize(Number(slider.value));
      slider.addEventListener("input", handler);
      return () => slider.removeEventListener("input", handler);
    }
  }, []);

  const frame = frames[currentFrame];

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    const rightClick = e.button === 2;

    setIsDrawing(true);
    setIsRightClick(rightClick);

    togglePixel(index, rightClick ? "erase" : "draw");
  };

  const handleMouseEnter = (index) => {
    if (isDrawing) {
      togglePixel(index, isRightClick ? "erase" : "draw");
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsRightClick(false);
  };

  // disable context menu on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const prevent = (e) => e.preventDefault();
      canvas.addEventListener("contextmenu", prevent);
      return () => canvas.removeEventListener("contextmenu", prevent);
    }
  }, []);

  const total = rows * cols;

  return (
    <div
      ref={canvasRef}
      onMouseUp={handleMouseUp}
      className="relative select-none"
      style={{ padding: "10px" }}
    >
      <div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const color = frame[i] || "rgba(255,255,255,0.08)";

          return (
            <div
              key={i}
              onMouseDown={(e) => handleMouseDown(e, i)}
              onMouseEnter={() => handleMouseEnter(i)}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: color,
                transition: "background-color 0.08s",
              }}
              className={`
                rounded-sm cursor-crosshair border border-[#00eaff20]
                hover:shadow-[0_0_6px_#00eaff] hover:border-[#00eaff80]
              `}
            />
          );
        })}
      </div>
    </div>
  );
}
