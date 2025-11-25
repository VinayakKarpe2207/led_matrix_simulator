import useMatrixStore from "../store/useMatrixStore";

export function generateBinary() {
  const { frames, rows, cols } = useMatrixStore.getState();

  const totalPixels = rows * cols;
  const bytes = [];

  frames.forEach((frame) => {
    for (let i = 0; i < totalPixels; i++) {
      const color = frame[i] || "#000000";

      // Convert hex to RGB numeric values
      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);

      bytes.push(r, g, b);
    }
  });

  return new Uint8Array(bytes);
}

export function downloadBin() {
  const bin = generateBinary();

  const blob = new Blob([bin], { type: "application/octet-stream" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "matrix_pattern.bin";
  link.click();
}
