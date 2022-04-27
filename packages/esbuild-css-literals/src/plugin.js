import path from "path";
import { readFile } from "fs/promises";
import MagicString from "magic-string";
import templateLiterals from "@uppercod/template-literals";
import { transformSync } from "esbuild";
import postcss from "postcss";
import postcssLoadConfig from "postcss-load-config";
/**
 *
 * @param {{minify:boolean, postcss:boolean}} options
 * @returns {import("esbuild").Plugin}
 */
export default function pluginsJsxRuntime(options) {
    return {
        name: "esbuild-css-literals",
        setup(build) {
            let currentConfigPostCss =
                options?.postcss && postcssLoadConfig({ parser: true });

            build.onLoad({ filter: /\.[jt]s(x){0,1}$/ }, async (args) => {
                const code = await readFile(args.path, "utf8");
                const magicString = new MagicString(code);

                await Promise.all(
                    templateLiterals(code)
                        .filter(
                            ({ type, params }) =>
                                type === "css" && !params.length
                        )
                        .map(async ({ start, end }) => {
                            let css = code.slice(start, end);

                            if (options.postcss) {
                                const { plugins, options: opts } =
                                    await currentConfigPostCss;
                                const result = await postcss(plugins).process(
                                    css,
                                    {
                                        from: args.path,
                                    }
                                );
                                css = result.css;
                            }

                            if (options?.minify) {
                                css = transformSync(css, {
                                    loader: "css",
                                    minify: true,
                                }).code;
                            }

                            if (css === code) return;

                            magicString.overwrite(start, end, css);
                        })
                );

                const map = magicString.generateMap();

                return {
                    contents:
                        magicString.toString() +
                        "\n//# sourceMappingURL=" +
                        map.toUrl(),
                    loader: path.extname(args.path).slice(1),
                };
            });
        },
    };
}
