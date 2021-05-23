import test from "ava";
import esbuild from "esbuild";
import fs from "fs/promises";
import pluginMetaUrl from "../src/module.js";

test("simple replace", async (t) => {
    await esbuild.build({
        entryPoints: ["tests/example/index.js"],
        outdir: "tests/dist",
        format: "esm",
        bundle: true,
        splitting: true,
        loader: {},
        minify: true,
        plugins: [
            pluginMetaUrl({
                css: true,
                svg: async () => ({ inline: "export default `<svg>`;" }),
            }),
        ],
    });

    t.is(
        await fs.readFile("tests/dist/index.js", "utf-8"),
        await fs.readFile("tests/expect-js.txt", "utf-8")
    );

    t.is(
        await fs.readFile("tests/dist/style-8df-952-8de.css", "utf-8"),
        await fs.readFile("tests/expect-css.txt", "utf-8")
    );
});
