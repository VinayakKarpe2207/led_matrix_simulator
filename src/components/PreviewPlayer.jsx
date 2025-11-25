import { useEffect, useRef, useState } from "react";
import useMatrixStore from "../store/useMatrixStore";
import { Play, Pause, RefreshCcw } from "lucide-react";

export default function PreviewPlayer({ small }) {
  const frames = useMatrixStore((s) => s.frames);
  const rows = useMatrixStore((s) => s.rows);
  const cols = useMatrixStore((s) => s.cols);

  const PIXEL_SIZE = small ? 7 : 10;
  const canvasRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [fps, setFps] = useState(10);
  const [loop, setLoop] = useState(true);
  const [index, setIndex] = useState(0);

  const timerRef = useRef(null);

  // Draw frame
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

  useEffect(() => {
    drawFrame(index);
  }, [index, frames, rows, cols]);

  return (
    <div
      className="
        rounded-xl backdrop-blur-md border
        p-4 w-full
        
        bg-white/70 text-black border-gray-300
        dark:bg-white/5 dark:border-[rgba(0,234,255,0.25)]
        dark:shadow-[0_0_8px_#00eaff]
      "
    >
      {/* Title */}
      <h3 className="text-sm mb-3 font-medium text-center tracking-wide text-cyan-400">
        PREVIEW
      </h3>

      {/* MAIN LAYOUT */}
      <div className="flex gap-4">

        {/* LEFT BUTTON STACK */}
        <div className="flex flex-col gap-3">

          {/* Play/Pause */}
          <button
            onClick={() => setPlaying(!playing)}
            className="
              w-10 h-10 flex items-center justify-center
              rounded-md text-cyan-300 
              bg-black/30 hover:bg-black/50 
              border border-[rgba(0,234,255,0.3)]
              transition shadow-sm
            "
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Loop */}
          <button
            onClick={() => setLoop(!loop)}
            className={`
              w-10 h-10 flex items-center justify-center
              rounded-md text-cyan-300 border transition shadow-sm
              ${
                loop
                  ? "bg-black/40 border-[rgba(0,234,255,0.7)]"
                  : "bg-black/20 border-[rgba(0,234,255,0.3)]"
              }
            `}
          >
            <RefreshCcw size={16} />
          </button>

        </div>

        {/* SCREEN PREVIEW */}
        <canvas
          ref={canvasRef}
          width={cols * PIXEL_SIZE}
          height={rows * PIXEL_SIZE}
          className="
            grow
            border border-[rgba(0,234,255,0.4)] 
            rounded shadow-[0_0_8px_#00eaff]
          "
        />
      </div>

      {/* FPS SLIDER */}
      <div
        className="
          mt-4 px-3 py-2 rounded-lg 
          bg-black/10 dark:bg-black/20 
          border border-gray-300 dark:border-[rgba(0,234,255,0.2)]
          flex flex-col items-center gap-1
        "
      >
        <span className="text-[11px] text-gray-700 dark:text-gray-300">
          FPS: {fps}
        </span>

        <input
          type="range"
          min="1"
          max="60"
          value={fps}
          onChange={(e) => setFps(Number(e.target.value))}
          className="w-full h-1 accent-[#00eaff] cursor-pointer"
        />
      </div>
    </div>
  );
}
