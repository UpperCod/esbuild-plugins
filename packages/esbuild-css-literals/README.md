# @uppercod/esbuild-css-literals

This plugin allows to transform the css literals either by minifying them or preprocessing them with postcss

## Example

```js
import pluginCssLiterals from "@uppercod/esbuild-css-literals";
import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["./tests/example.jsx"],
    plugins: [
        pluginCssLiterals({
            minify: true,
            postcss: true,
        }),
    ],
});
```
