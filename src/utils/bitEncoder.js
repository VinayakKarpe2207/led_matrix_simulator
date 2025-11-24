import useMatrixStore from "../store/useMatrixStore";

export default function generateCArray() {
  const { rows, cols, frames } = useMatrixStore.getState();

  let output = `const uint8_t frames[][${rows}] PROGMEM = {\n`;

  frames.forEach((frame, fi) => {
    output += "  { ";
    for (let r = 0; r < rows; r++) {
      let byte = 0;
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        if (frame[index] === 1) byte |= 1 << (7 - c);
      }
      output += `0x${byte.toString(16).padStart(2, "0")}`;
      if (r < rows - 1) output += ", ";
    }
    output += " },\n";
  });

  output += "};\n";
  return output;
}
