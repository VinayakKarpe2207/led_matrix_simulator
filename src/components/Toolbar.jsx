import useMatrixStore from "../store/useMatrixStore";

export default function Toolbar() {
  const addFrame = useMatrixStore((s) => s.addFrame);

  return (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded mb-4">
      <button
        className="bg-blue-600 px-4 py-2 rounded"
        onClick={addFrame}
      >
        ➕ Add Frame
      </button>
    </div>
  );
}
