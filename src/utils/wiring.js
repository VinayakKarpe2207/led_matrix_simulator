export function serpentineIndex(rows, cols) {
  let map = [];

  for (let r = 0; r < rows; r++) {
    if (r % 2 === 0) {
      for (let c = 0; c < cols; c++) map.push(r * cols + c);
    } else {
      for (let c = cols - 1; c >= 0; c--) map.push(r * cols + c);
    }
  }

  return map;
}

export function progressiveIndex(rows, cols) {
  return Array.from({ length: rows * cols }, (_, i) => i);
}
