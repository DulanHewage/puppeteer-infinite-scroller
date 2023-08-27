const esbuild = require("esbuild");

(async () => {
  await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    platform: "node",
    target: "node16",
    outdir: "lib",
    minify: true,
    format: "cjs",
  });
})();
