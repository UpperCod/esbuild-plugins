import builtins from "builtin-modules";
import pkg from "./package.json";

export default {
    input: ["./src/plugin.js"],
    external: Object.keys(pkg.dependencies || {}).concat(builtins),
    output: {
        file: "./plugin.cjs",
        format: "cjs",
        sourcemap: true,
    },
};
