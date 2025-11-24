import { BrowserRouter, Routes, Route } from "react-router-dom";

import Setup from "./pages/Setup";
import Editor from "./pages/Editor";
import Export from "./pages/Export";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Setup />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
