import { loadFont } from "@remotion/google-fonts/Inter";

// Loads Inter (registers family "Inter") and manages delayRender internally,
// so no flash of fallback type in the first frames. Import this for the side
// effect anywhere the composition mounts.
export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
