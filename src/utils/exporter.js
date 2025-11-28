// src/utils/exporter.js
//
// Generates:
// 1) Frame array (.h)
// 2) Full WS2812 program (.ino)
// 3) Full MAX7219 program (.ino)

import useMatrixStore from "../store/useMatrixStore";

/* -------------------------------------------------------
   CREATE CLEAN, SAFE FRAME ARRAY (.H)
------------------------------------------------------- */
export function generateFrameArray() {
  const { rows, cols, frames } = useMatrixStore.getState();
  const total = rows * cols;

  let out = "";
  out += `#include <pgmspace.h>\n\n`;
  out += `#define ROWS ${rows}\n`;
  out += `#define COLS ${cols}\n`;
  out += `#define FRAME_COUNT ${frames.length}\n\n`;

  out += `const uint32_t frames[FRAME_COUNT][ROWS * COLS] PROGMEM = {\n`;

  frames.forEach((frame, fi) => {
    out += `  { `;
    for (let i = 0; i < total; i++) {
      const px = frame[i] || null;
      out += px ? `0x${px.replace("#", "")}` : `0x000000`;
      if (i < total - 1) out += ", ";
    }
    out += " },\n";
  });

  out += `};\n`;

  return out;
}

/* -------------------------------------------------------
   WS2812 FULL PROGRAM EXPORT (.ino)
------------------------------------------------------- */
export function generateWS2812Program() {
  const { rows, cols } = useMatrixStore.getState();
  const array = generateFrameArray();

  return `
${array}

// ============ USER SETTINGS ============
#include <Adafruit_NeoPixel.h>

#define LED_PIN 2              // DI pin of WS2812
#define NUM_PIXELS (ROWS * COLS)
#define BRIGHTNESS 80          // 0–255
#define FPS 10                 // Frames per second
// =======================================

Adafruit_NeoPixel strip(NUM_PIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.setBrightness(BRIGHTNESS);
  strip.show();
}

void showFrame(int index) {
  for (int i = 0; i < ROWS * COLS; i++) {
    uint32_t color = pgm_read_dword(&frames[index][i]);
    strip.setPixelColor(i, color);
  }
  strip.show();
}

void loop() {
  for (int f = 0; f < FRAME_COUNT; f++) {
    showFrame(f);
    delay(1000 / FPS);
  }
}
`;
}

/* -------------------------------------------------------
   MAX7219 FULL PROGRAM EXPORT (.ino)
------------------------------------------------------- */
export function generateMAX7219Program() {
  const { rows, cols } = useMatrixStore.getState();
  const array = generateFrameArray();

  return `
${array}

// ============ USER SETTINGS ============
#include <LedControl.h>
#define DIN 12
#define CS  10
#define CLK 11
#define FPS 10
// =======================================

LedControl lc = LedControl(DIN, CLK, CS, 1);

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 7);
  lc.clearDisplay(0);
}

void showFrame(int index) {
  for (int r = 0; r < ROWS; r++) {
    for (int c = 0; c < COLS; c++) {
      int i = r * COLS + c;
      uint32_t color = pgm_read_dword(&frames[index][i]);
      int bit = (color > 0) ? 1 : 0;
      lc.setLed(0, r, c, bit);
    }
  }
}

void loop() {
  for (int f = 0; f < FRAME_COUNT; f++) {
    showFrame(f);
    delay(1000 / FPS);
  }
}
`;
}
