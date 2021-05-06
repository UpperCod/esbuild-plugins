# @uppercod/esbuild-meta-url

Separate the Files control from esbuild, to hold them as files referenced by a URL.

## Example

### Config

```js
import esbuild from "esbuild";
import pluginMetaUrl from "@uppercod/esbuild-meta-url";

await esbuild.build({
    entryPoints: ["./src/index.js"],
    outdir: "dist",
    format: "esm",
    bundle: true,
    splitting: true,
    loader: {},
    plugins: [pluginFileUrl({ css: true })],
});
```

### index.js

```js
import styleUrl from "./style.css";

console.log(styleUrl.href);
```

the `css` files will be copied to the destination and the import will refer to the destination as an example url relative to the module.

## install

```
npm install@uppercod/esbuild-meta-url
```

## Options

```js
pluginFileUrl({
    css: true,
    /**
     * you can alternatively associate a callback to
     * modify the script manually, escaping from esbuild
     * @param {Object} File
     * @param {string} File.id - base of the file in destination
     * @param {string} File.src - source of file on disk
     * @param {string} File.type - file type
     * @param {string} File.dest - file write destination
     * @returns {string}
     */
    md: ({ id, type, src, dest }) => {
        // The id will be the reference to use for the URL,
        // it is mandatory to return this
        return id;
    },
});
```

> This plugin does not break with other plugins, it generates sub-instances of esbuild to process the files if any plugin requires it. these sub-instances will inherit the settings
