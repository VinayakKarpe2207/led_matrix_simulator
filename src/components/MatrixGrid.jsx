import useMatrixStore from "../store/useMatrixStore";

export default function MatrixGrid() {
  const rows = useMatrixStore((s) => s.rows);
  const cols = useMatrixStore((s) => s.cols);
  const frames = useMatrixStore((s) => s.frames);
  const currentFrame = useMatrixStore((s) => s.currentFrame);
  const togglePixel = useMatrixStore((s) => s.togglePixel);

  const total = rows * cols;
  const frame = frames[currentFrame] || [];

  return (
    <div className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${cols}, 20px)`
      }}>
      {Array.from({ length: total }).map((_, i) => {
        const on = frame[i] === 1;
        return (
          <div key={i}
            onClick={() => togglePixel(i)}
            className={`w-5 h-5 rounded cursor-pointer 
              ${on ? "bg-green-400" : "bg-gray-700"}`}
          />
        );
      })}
    </div>
  );
}
