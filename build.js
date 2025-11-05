// build.js (CommonJS)
const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: ["node20"],
    outfile: "dist/index.js",
    format: "cjs",
    minify: true,
    legalComments: "none",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    drop: ["console"],
  })
  .then(() => {
    console.log("✅ Build completed successfully!");
    console.log("📦 Output file: dist/index.js");
    console.log("🚀 Ready to run production server: yarn start");
  })
  .catch((err) => {
    console.error("❌ Build failed:", err);
    process.exit(1);
  });
