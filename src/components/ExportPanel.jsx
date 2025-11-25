import generatePlugAndPlay from "../utils/exportPlugPlay";
import generateCArray from "../utils/bitEncoder";
import downloadFile from "../utils/download";

export default function ExportPanel() {
  const exportPlug = () => {
    const code = generatePlugAndPlay();
    downloadFile("plug_and_play.ino", code);
  };

  const exportHeader = () => {
    const code = generateCArray();
    downloadFile("animation.h", code);
  };

  const exportZip = () => {
    alert("ZIP Export coming soon");
  };

  return (
    <div className="flex flex-col gap-3">

      <button
        onClick={exportPlug}
        className="
          py-2 rounded bg-blue-600 text-white 
          hover:bg-blue-700 transition
        "
      >
        Export Plug-and-Play Code
      </button>

      <button
        onClick={exportHeader}
        className="
          py-2 rounded bg-green-600 text-white 
          hover:bg-green-700 transition
        "
      >
        Export animation.h
      </button>

      <button
        onClick={exportZip}
        className="
          py-2 rounded bg-purple-600 text-white 
          hover:bg-purple-700 transition
        "
      >
        Download Firmware ZIP
      </button>

    </div>
  );
}
