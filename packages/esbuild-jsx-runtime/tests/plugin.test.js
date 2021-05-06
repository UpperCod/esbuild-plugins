import test from "ava";
import esbuild from "esbuild";
import plugin from "../src/plugin.js";

test("simple replace", async (t) => {
    const { outputFiles } = await esbuild.build({
        entryPoints: ["./tests/example.jsx"],
        write: false,
        plugins: [plugin()],
    });

    const [{ text }] = outputFiles;

    t.is(
        text,
        [
            `import {jsx as _jsx} from "atomico/jsx-runtime";`,
            `console.log(/* @__PURE__ */ _jsx("div", null));`,
            "",
        ].join("\n")
    );
});
