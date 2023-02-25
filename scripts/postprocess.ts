import * as fs from "node:fs";
import * as uglify from "uglify-js";

const bundleFile = fs.readFileSync("./dist/bundle.js");

let bundle = bundleFile.toString().replace(/export\{.*\}/g, "");

const license = fs.readFileSync("./LICENSE.txt");

const code =
  uglify.minify(bundle, {
    mangle: { reserved: ["onGet", "onPost"] },
  }).code +
  `\n/*\nhttps://github.com/sevenc-nanashi/vv-telemetry-gas\n\n${license}\n*/`;

fs.writeFileSync("./dist/bundle.js", code);
