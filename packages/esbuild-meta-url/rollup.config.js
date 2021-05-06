import pkg from "./package.json";

export default {
    input: pkg.module,
    external: Object.keys(pkg.dependencies || {}),
    output: {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
    },
};
