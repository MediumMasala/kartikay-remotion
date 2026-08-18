import { Config } from "@remotion/cli/config";

// GIF codec / scale / every-nth-frame are passed per-render on the CLI
// (see package.json scripts) so we keep global config minimal.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
