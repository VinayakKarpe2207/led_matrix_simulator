import generateCArrayRGB from "../utils/bitEncoder";       // RGB C code export
import { downloadBin } from "../utils/binExport.js";           // Binary export
import { downloadFile } from "../utils/download";           // .h file download

export default function ExportModal({ onClose }) {
  const code = generateCArrayRGB(); // RGB C export

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-xl text-white border border-gray-700 shadow-2xl">

        <h2 className="text-3xl font-bold mb-4 text-center">Export Pattern</h2>

        {/* C Header Code */}
        <label className="text-lg font-medium">C Header (.h)</label>
        <textarea
          className="w-full h-56 bg-gray-800 p-3 rounded mt-2 font-mono text-sm"
          readOnly
          value={code}
        />

        {/* DOWNLOAD BUTTONS */}
        <div className="mt-6 flex flex-col gap-3">

          {/* Download RGB C Header */}
          <button
            onClick={() => downloadFile("pattern_rgb.h", code)}
            className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-lg font-semibold"
          >
            📄 Download RGB C Array (.h)
          </button>

          {/* Download Binary */}
          <button
            onClick={downloadBin}
            className="bg-green-600 hover:bg-green-700 py-3 rounded-lg text-lg font-semibold"
          >
            💾 Download Binary (.bin)
          </button>

          {/* Close Modal */}
          <button
            className="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg text-lg font-semibold mt-2"
            onClick={onClose}
          >
            ✖ Close
          </button>

        </div>

      </div>
    </div>
  );
}
