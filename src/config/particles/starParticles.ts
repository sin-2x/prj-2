import type { ISourceOptions } from "@tsparticles/engine";

export const starParticles: ISourceOptions = {
  fullScreen: false,
  particles: {
    number: { value: 200 },
    color: { value: "#FFFFFF" },
    opacity: { value: { min: 0.25, max: 0.85 }, animation: { enable: true, speed: 0.35 } },
    size: { value: { min: 1, max: 2.6 } },
    move: { enable: true, speed: 0.08, outModes: "bounce" },
  },
};
