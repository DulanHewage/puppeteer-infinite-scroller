const esbuild = require("esbuild");
const { Generator } = require("npm-dts");

new Generator({
  entry: "index.ts",
  output: "lib/index.d.ts",
}).generate();

(async () => {
  await esbuild.build({
    entryPoints: ["index.ts"],
    bundle: true,
    platform: "node",
    target: "node16",
    outdir: "lib",
    minify: true,
  });
})();
