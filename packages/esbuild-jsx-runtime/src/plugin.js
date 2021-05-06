import { readFile } from "fs/promises";
import MagicString from "magic-string";

/**
 * @param {Object} [options]
 * @param {string} [options.jsxFactory]
 * @param {string} [options.jsxFragment]
 * @param {string} [options.jsxImportSource]
 * @returns {import("esbuild").Plugin}
 */
export default function pluginsJsxRuntime({
    jsxFactory = "_jsx",
    jsxFragment = "Fragment",
    jsxImportSource = "atomico",
} = {}) {
    return {
        name: "esbuild-jsx-plugin",
        setup(build) {
            Object.assign(build.initialOptions, { jsxFactory, jsxFragment });

            build.onLoad({ filter: /\.[jt]sx$/ }, async (args) => {
                const jsx = await readFile(args.path, "utf8");
                const code = new MagicString(jsx);
                code.prepend(
                    `import { jsx as _jsx } from "${jsxImportSource}/jsx-runtime";`
                );
                const map = code.generateMap();
                return {
                    contents:
                        code.toString() +
                        "\n//# sourceMappingURL=" +
                        map.toUrl(),
                    loader: "jsx",
                };
            });
        },
    };
}
