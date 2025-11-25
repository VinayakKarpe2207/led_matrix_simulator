// src/utils/fill.js
//
// Flood fill for LED matrix animation editor.
// Fills contiguous region of the same type:
// - NULL region fill
// - Or same-color region fill
//
// Works with index mapping inside MatrixCanvas.

import useMatrixStore from "../store/useMatrixStore";

export default function floodFill(cell, rows, cols, fillColor) {
  const { frames, currentFrame, updatePixel } = useMatrixStore.getState();

  const frame = frames[currentFrame];
  const startIndex = cell.r * cols + cell.c;
  const targetColor = frame[startIndex];

  // If the clicked pixel is already the fill color → do nothing
  if (targetColor === fillColor) return;

  const stack = [startIndex];
  const visited = new Set();

  const match = (index) => frame[index] === targetColor;

  while (stack.length > 0) {
    const idx = stack.pop();
    if (visited.has(idx)) continue;
    visited.add(idx);

    if (!match(idx)) continue;

    // Apply fill
    updatePixel(idx, fillColor);

    const r = Math.floor(idx / cols);
    const c = idx % cols;

    // 4-directional neighbors
    const neighbors = [];

    if (c > 0) neighbors.push(idx - 1);
    if (c < cols - 1) neighbors.push(idx + 1);
    if (r > 0) neighbors.push(idx - cols);
    if (r < rows - 1) neighbors.push(idx + cols);

    for (const n of neighbors) {
      if (!visited.has(n)) stack.push(n);
    }
  }
}
