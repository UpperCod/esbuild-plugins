import pkg from "./package.json";

export default {
    input: ["./src/plugin.js"],
    external: Object.keys(pkg.dependencies || {}),
    output: {
        file: "./plugin.cjs",
        format: "cjs",
        sourcemap: true,
    },
};
