import { create } from "zustand";

const useMatrixStore = create((set) => ({
  rows: 8,
  cols: 8,
  wiring: "serpentine",
  controller: "ESP8266",
  frames: [[]], // frame 0 is empty
  currentFrame: 0,

  setMatrixSize: (r, c) => set({ rows: r, cols: c }),
  setWiring: (w) => set({ wiring: w }),
  setController: (c) => set({ controller: c }),

  togglePixel: (index) =>
    set((state) => {
      const frames = [...state.frames];
      const frame = [...frames[state.currentFrame]];
      frame[index] = frame[index] ? 0 : 1;
      frames[state.currentFrame] = frame;
      return { frames };
    }),

  addFrame: () =>
    set((state) => ({
      frames: [...state.frames, []],
      currentFrame: state.frames.length,
    })),

  setFrameIndex: (i) => set({ currentFrame: i }),
}));

export default useMatrixStore;
