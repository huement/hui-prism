import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Build configuration
const config = {
  // Input and output paths
  input: {
    main: join(__dirname, "theme.scss"),
    src: join(__dirname, "src"),
  },
  output: {
    dist: join(__dirname, "dist"),
    css: join(__dirname, "dist", "theme.css"),
    cssMin: join(__dirname, "dist", "theme.min.css"),
    map: join(__dirname, "dist", "theme.css.map"),
  },

  // Build targets
  targets: {
    development: {
      style: "expanded",
      sourceMap: true,
      sourceMapIncludeSources: true,
      verbose: true,
      outputFile: "theme.css",
    },
    production: {
      style: "compressed",
      sourceMap: false,
      verbose: false,
      outputFile: "theme.min.css",
    },
  },

  // Watch configuration
  watch: {
    files: ["src/**/*.scss", "theme.scss"],
    ignore: ["node_modules/**", "dist/**"],
  },
};

// Ensure dist directory exists
if (!existsSync(config.output.dist)) {
  mkdirSync(config.output.dist, { recursive: true });
}

export default config;
