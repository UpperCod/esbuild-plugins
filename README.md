# @uppercod/esbuild-\*

monorepo of plugins created by @uppercod for esbuild:

### [@uppercod/esbuild-jsx-runtime](./packages/esbuild-jsx-runtime/README.md)

Add lightweight support for jsx-runtime, designed for Atomico.

### [@uppercod/esbuild-meta-url](./packages/esbuild-meta-url/README.md)

import files as URL instances referenced to the file, example:

```js
import style from "./style.css";

console.log(style.href);
```

# [@uppercod/esbuild-css-literals](./packages/esbuild-css-literals/README.md)

This plugin allows to transform the css literals either by minifying them or preprocessing them with postcss

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

## Todo

### @uppercod/esbuild-globs 💡

that the entries respond to search by expressions

### @uppercod/esbuild-sizes 💡

Expect to generate output file size metric
