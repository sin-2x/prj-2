import { useParticlesProvider } from "@tsparticles/react";

export function useParticlesEngine() {
  const { loaded } = useParticlesProvider();
  return loaded;
}
