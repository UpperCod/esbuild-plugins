import test from "ava";
import esbuild from "esbuild";
import plugin from "../src/plugin.js";
import { readFile } from "fs/promises";

test("simple replace", async (t) => {
    const { outputFiles } = await esbuild.build({
        entryPoints: ["./tests/javascript.jsx", "./tests/typescript.tsx"],
        write: false,
        plugins: [plugin()],
        outdir: "./tests/dist",
    });

    const [{ text: jsx }, { text: tsx }] = outputFiles;

    t.is(await readFile("./tests/expect-jsx.txt", "utf8"), jsx);
    t.is(await readFile("./tests/expect-tsx.txt", "utf8"), tsx);
});
