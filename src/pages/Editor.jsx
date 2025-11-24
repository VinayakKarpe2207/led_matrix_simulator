import { useState } from "react";
import MatrixGrid from "../components/MatrixGrid";
import FrameTimeline from "../components/FrameTimeline";
import Toolbar from "../components/Toolbar";
import ExportModal from "../components/ExportModal";

export default function Editor() {
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="p-6 text-white">
      <Toolbar />

      <MatrixGrid />
      <FrameTimeline />

      <button
        onClick={() => setShowExport(true)}
        className="bg-green-600 px-4 py-2 rounded mt-6"
      >
        Export
      </button>

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}
