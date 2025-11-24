import { useNavigate } from "react-router-dom";
import useMatrixStore from "../store/useMatrixStore";
import { useState } from "react";

export default function Setup() {
  const navigate = useNavigate();

  const setMatrixSize = useMatrixStore((s) => s.setMatrixSize);
  const setWiring = useMatrixStore((s) => s.setWiring);
  const setController = useMatrixStore((s) => s.setController);

  const [sizeType, setSizeType] = useState("8x8");
  const [customRows, setCustomRows] = useState(4);
  const [customCols, setCustomCols] = useState(4);

  const handleStart = () => {
    let rows, cols;

    if (sizeType === "custom") {
      if (customRows < 4 || customCols < 4)
        return alert("Custom size must be at least 4 × 4");

      rows = customRows;
      cols = customCols;
    } else {
      const [r, c] = sizeType.split("x").map(Number);
      rows = r;
      cols = c;
    }

    setMatrixSize(rows, cols);
    navigate("/editor");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">

      {/* LEFT SECTION */}
      <div className="flex-1 flex items-center justify-center p-10 bg-gradient-to-br from-blue-900 to-black">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Create.  
            <span className="text-blue-400"> Simulate. </span>  
            Build.
          </h1>

          <p className="text-gray-300 text-xl mt-6 max-w-md">
            Design powerful LED matrix animations, customize wiring patterns, 
            and export ready-to-use firmware code for ESP, Arduino, WS2812, and more.
          </p>

          <p className="mt-4 text-blue-400 font-semibold text-lg">
            Your LED creativity starts here.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION (OPTIONS FORM) */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-700">

          <h2 className="text-3xl font-bold text-center mb-6">
            Setup Your Matrix
          </h2>

          {/* Matrix Size */}
          <label className="block mb-5">
            <span className="text-lg font-medium">Matrix Size</span>
            <select
              className="bg-gray-700 mt-2 p-2 rounded w-full outline-none"
              value={sizeType}
              onChange={(e) => setSizeType(e.target.value)}
            >
              <option value="8x8">8 × 8</option>
              <option value="16x16">16 × 16</option>
              <option value="32x32">32 × 32</option>
              <option value="custom">Custom</option>
            </select>

            {sizeType === "custom" && (
              <div className="flex gap-3 mt-3">
                <input
                  type="number"
                  min="4"
                  value={customRows}
                  onChange={(e) => setCustomRows(Number(e.target.value))}
                  className="bg-gray-700 p-2 rounded w-full outline-none"
                  placeholder="Rows"
                />

                <input
                  type="number"
                  min="4"
                  value={customCols}
                  onChange={(e) => setCustomCols(Number(e.target.value))}
                  className="bg-gray-700 p-2 rounded w-full outline-none"
                  placeholder="Columns"
                />
              </div>
            )}
          </label>

          {/* Wiring Pattern */}
          <label className="block mb-5">
            <span className="text-lg font-medium">Wiring Pattern</span>
            <select
              className="bg-gray-700 mt-2 p-2 rounded w-full outline-none"
              onChange={(e) => setWiring(e.target.value)}
            >
              <option value="progressive">Progressive (L → R)</option>
              <option value="reverse_progressive">Reverse Progressive (R → L)</option>
              <option value="serpentine">Serpentine (Zig-Zag)</option>
              <option value="reverse_serpentine">Reverse Serpentine</option>
              <option value="top_left">Start Top-Left</option>
              <option value="top_right">Start Top-Right</option>
              <option value="bottom_left">Start Bottom-Left</option>
              <option value="bottom_right">Start Bottom-Right</option>
            </select>
          </label>

          {/* Controller */}
          <label className="block mb-5">
            <span className="text-lg font-medium">Controller</span>
            <select
              className="bg-gray-700 mt-2 p-2 rounded w-full outline-none"
              onChange={(e) => setController(e.target.value)}
            >
              <option value="ESP8266">ESP8266</option>
              <option value="ESP32">ESP32</option>
              <option value="Arduino">Arduino UNO/Nano</option>
              <option value="WS2812">WS2812 RGB LED</option>
              <option value="MAX7219">MAX7219 Dot Matrix</option>
            </select>
          </label>

          <button
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl mt-6 text-lg font-semibold shadow-md"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
