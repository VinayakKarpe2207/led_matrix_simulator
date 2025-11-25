import { useEffect, useRef, useState } from "react";
import useMatrixStore from "../store/useMatrixStore";
import { Play, Pause, RefreshCcw } from "lucide-react";

export default function PreviewPlayer() {
  const frames = useMatrixStore((s) => s.frames);
  const rows = useMatrixStore((s) => s.rows);
  const cols = useMatrixStore((s) => s.cols);

  const [playing, setPlaying] = useState(false);
  const [fps, setFps] = useState(8);
  const [loop, setLoop] = useState(true);

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const canvasRef = useRef(null);
  const PIXEL_SIZE = 6; // tiny preview pixels

  // Draw a frame to the canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const frame = frames[frameIndex];
    if (!frame) return;

    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const color = frame[i] || "#000000";
        ctx.fillStyle = color;
        ctx.fillRect(
          c * PIXEL_SIZE,
          r * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
        i++;
      }
    }
  };

  // Animation loop
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setIndex((prev) => {
          const next = prev + 1;
          if (next >= frames.length) return loop ? 0 : frames.length - 1;
          return next;
        });
      }, 1000 / fps);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [playing, fps, loop, frames.length]);

  // Redraw when index or frame data changes
  useEffect(() => {
    drawFrame(index);
  }, [index, frames, rows, cols]);

  return (
    <div
      className="p-4 rounded-xl bg-white/5 backdrop-blur-md border 
                 border-[rgba(0,234,255,0.25)]
                 shadow-[0_0_10px_#00eaff] w-[180px]"
    >
      <h3 className="text-center text-sm mb-2 text-cyan-300">
        Preview
      </h3>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={cols * PIXEL_SIZE}
        height={rows * PIXEL_SIZE}
        className="border border-[rgba(0,234,255,0.4)] rounded mx-auto mb-3
                   shadow-[0_0_6px_#00eaff]"
      />

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-2">
        {/* Play / Pause */}
        <button
          onClick={() => setPlaying(!playing)}
          className="p-2 bg-black/30 rounded hover:bg-black/50 
                     text-cyan-300 border border-[rgba(0,234,255,0.4)]"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Loop toggle */}
        <button
          onClick={() => setLoop(!loop)}
          className={`p-2 rounded border text-cyan-300
                      ${loop 
                        ? "bg-black/40 border-[rgba(0,234,255,0.7)]" 
                        : "bg-black/20 border-[rgba(0,234,255,0.3)]"
                      }`}
        >
          <RefreshCcw size={14} />
        </button>
      </div>

      {/* FPS Slider */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-300 mb-1">FPS: {fps}</label>
        <input
          type="range"
          min="1"
          max="60"
          value={fps}
          onChange={(e) => setFps(Number(e.target.value))}
          className="accent-[#00eaff]"
        />
      </div>
    </div>
  );
}
