import useMatrixStore from "../store/useMatrixStore";

export default function generateCArrayRGB() {
  const { rows, cols, frames } = useMatrixStore.getState();
  const totalPixels = rows * cols;

  let output = `const uint8_t frames[][${totalPixels}][3] PROGMEM = {\n`;

  frames.forEach((frame) => {
    output += "  {\n";

    for (let i = 0; i < totalPixels; i++) {
      let color = frame[i] || "#000000";

      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);

      output += `    { ${r}, ${g}, ${b} }`;

      if (i < totalPixels - 1) output += ",";
      output += "\n";
    }

    output += "  },\n";
  });

  output += "};\n";
  return output;
}
