import * as fs from "node:fs";

const bundleFile = fs.readFileSync("./dist/bundle.js");

let bundle = bundleFile
  .toString()
  .replace("import 'google-apps-script';", "")
  .replace(/export \{.*\}/g, "");

const license = fs.readFileSync("./LICENSE.txt");

bundle = `/*\nhttps://github.com/sevenc-nanashi/vv-telemetry-gas\n\n${license}\n*/\n${bundle}`;

fs.writeFileSync("./dist/bundle-postprocess.js", bundle);
