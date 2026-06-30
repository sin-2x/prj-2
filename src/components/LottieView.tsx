import type { ComponentType } from "react";
import LottieModule, { type LottieComponentProps } from "lottie-react";

type LottieExport = ComponentType<LottieComponentProps> | { default: ComponentType<LottieComponentProps> };

const exportedLottie = LottieModule as unknown as LottieExport;

export const LottieView =
  typeof exportedLottie === "function" ? exportedLottie : exportedLottie.default;
 