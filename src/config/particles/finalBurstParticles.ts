import type { ISourceOptions } from "@tsparticles/engine";

export const finalBurstParticles: ISourceOptions = {
  fullScreen: false,
  emitters: {
    life: { count: 1, duration: 0.25 },
    rate: { quantity: 800, delay: 0.1 },
    position: { x: 50, y: 58 },
  },
  particles: {
    color: { value: ["#C9637A", "#FADADD", "#D4AF37"] },
    opacity: { value: { min: 0.5, max: 1 } },
    size: { value: { min: 2, max: 6 } },
    shape: { type: "char", options: { char: { value: ["♡", "♥"], font: "serif" } } },
    move: { enable: true, speed: { min: 4, max: 10 }, direction: "top", outModes: "out" },
  },
};
