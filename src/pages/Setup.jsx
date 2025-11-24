import { useNavigate } from "react-router-dom";
import useMatrixStore from "../store/useMatrixStore";
import { useState } from "react";

export default function Setup() {
  const navigate = useNavigate();

  const setMatrixSize = useMatrixStore((s) => s.setMatrixSize);
  const setWiring = useMatrixStore((s) => s.setWiring);
  const setController = useMatrixStore((s) => s.setController);

  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(8);

  const handleStart = () => {
    if (rows < 1 || cols < 1) return alert("Matrix size must be at least 1x1");

    setMatrixSize(rows, cols);
    navigate("/editor");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-700">

        <h1 className="text-3xl font-bold text-center mb-6">
          LED Matrix Builder
        </h1>

        {/* Matrix Size */}
        <label className="block mb-4">
          <span className="text-lg font-medium">Matrix Size</span>

          <div className="flex gap-3 mt-2">
            <input
              type="number"
              min="1"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="bg-gray-700 p-2 rounded w-full outline-none"
            />

            <input
              type="number"
              min="1"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="bg-gray-700 p-2 rounded w-full outline-none"
            />
          </div>

          <p className="text-sm text-gray-400 mt-1">Rows × Columns</p>
        </label>

        {/* Wiring Pattern */}
        <label className="block mb-4">
          <span className="text-lg font-medium">Wiring Pattern</span>

          <select
            className="bg-gray-700 mt-2 p-2 w-full rounded outline-none"
            onChange={(e) => setWiring(e.target.value)}
          >
            <option value="serpentine">Serpentine (zig-zag)</option>
            <option value="progressive">Progressive (left→right)</option>
          </select>
        </label>

        {/* Controller */}
        <label className="block mb-4">
          <span className="text-lg font-medium">Controller</span>

          <select
            className="bg-gray-700 mt-2 p-2 w-full rounded outline-none"
            onChange={(e) => setController(e.target.value)}
          >
            <option value="ESP8266">ESP8266</option>
            <option value="ESP32">ESP32</option>
            <option value="Arduino">Arduino (UNO/Nano)</option>
            <option value="WS2812">WS2812 LED Strip</option>
            <option value="MAX7219">MAX7219 Matrix</option>
          </select>
        </label>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl mt-6 text-lg font-semibold shadow-md"
        >
          Continue to Editor →
        </button>

      </div>
    </div>
  );
}
