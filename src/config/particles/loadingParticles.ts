import type { ISourceOptions } from "@tsparticles/engine";

export const loadingParticles: ISourceOptions = {
  fullScreen: false,
  particles: {
    number: { value: 80 },
    color: { value: "#D4AF37" },
    opacity: { value: { min: 0.3, max: 0.6 } },
    size: { value: { min: 2, max: 5 } },
    move: { enable: true, speed: 0.55, direction: "top", drift: 0.35, outModes: "out" },
  },
};
