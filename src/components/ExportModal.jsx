import generateCArray from "../utils/bitEncoder";

export default function ExportModal({ onClose }) {
  const code = generateCArray();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded w-[90%] max-w-xl text-white">
        <h2 className="text-2xl mb-3">Export C Header</h2>

        <textarea
          className="w-full h-60 bg-gray-800 p-3 rounded"
          readOnly
          value={code}
        />

        <button
          className="bg-blue-600 w-full mt-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
