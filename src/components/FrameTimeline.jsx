import useMatrixStore from "../store/useMatrixStore";

export default function FrameTimeline() {
  const frames = useMatrixStore((s) => s.frames);
  const currentFrame = useMatrixStore((s) => s.currentFrame);
  const setFrameIndex = useMatrixStore((s) => s.setFrameIndex);

  return (
    <div className="flex gap-2 mt-4 overflow-x-auto">
      {frames.map((_, i) => (
        <button
          key={i}
          onClick={() => setFrameIndex(i)}
          className={`px-4 py-2 rounded ${
            i === currentFrame ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          Frame {i + 1}
        </button>
      ))}
    </div>
  );
}
