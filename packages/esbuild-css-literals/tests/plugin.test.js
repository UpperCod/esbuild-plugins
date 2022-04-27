import test from "ava";
import esbuild from "esbuild";
import plugin from "../src/plugin.js";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";

test("simple replace", async (t) => {
    const { outputFiles } = await esbuild.build({
        entryPoints: ["./tests/javascript.js", "./tests/typescript.tsx"],
        write: false,
        plugins: [plugin({ minify: true, postcss: true })],
        outdir: "./tests/dist",
    });

    const [{ text: js }, { text: tsx }] = outputFiles;

    // writeFile("./tests/check-js.txt", js);
    // writeFile("./tests/check-tsx.txt", tsx);

    t.is(await readFile("./tests/expect-js.txt", "utf8"), js);
    t.is(await readFile("./tests/expect-tsx.txt", "utf8"), tsx);
});
