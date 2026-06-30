import type { ISourceOptions } from "@tsparticles/engine";

export const petalParticles: ISourceOptions = {
  fullScreen: false,
  particles: {
    number: { value: 36 },
    color: { value: ["#FADADD", "#C9637A", "#FFFFFF"] },
    opacity: { value: 0.22 },
    size: { value: { min: 4, max: 9 } },
    shape: { type: "char", options: { char: { value: ["♡", "♥"], font: "serif" } } },
    move: { enable: true, speed: 0.62, direction: "bottom", drift: 0.25, outModes: "out" },
  },
};
