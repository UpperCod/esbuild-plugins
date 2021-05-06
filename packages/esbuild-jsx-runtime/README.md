# @uppercod/esbuild-jsx-runtime

This plugin provides a shallow implementation of jsx-runtime. it does not perform an analysis it only injects the jsxImportSource when working with `jsx` or` tsx` files.

## Example

```js
import pluginsJsxRuntime from "@uppercod/esbuild-jsx-runtime";
import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["./tests/example.jsx"],
    plugins: [
        pluginsJsxRuntime({
            jsxFactory, // default "_jsx",
            jsxFragment, // default "Fragment",
            jsxImportSource, // default "atomico"
        }),
    ],
});
```
