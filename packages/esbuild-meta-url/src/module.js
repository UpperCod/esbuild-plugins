import path from "path";
import fs from "fs/promises";
import { hash } from "@uppercod/hash";
import esbuild from "esbuild";

const cwd = process.cwd();
const normalize = (src) => path.relative(cwd, src).replace(/\\/, "/");
const name = "esbuild-meta-url";

/**
 * @param {Object<string,boolean|(file:File)=>(Promise<Resolve>|Resolve)} files
 * @returns {import("esbuild").Plugin}
 */
export default function pluginFileUrl(files) {
    return {
        name,
        setup(build) {
            const ext = Object.keys(files).filter((key) => files[key]);

            let dirPrepare;

            const entry = {};

            const ready = {};

            const filter = RegExp(`\\.(${ext.join("|")})$`);

            const { watch, outdir, splitting, ...share } = build.initialOptions;

            share.plugins = share.plugins.filter(
                (plugin) => plugin.name != name
            );

            const prepareDir = () =>
                (dirPrepare =
                    dirPrepare ||
                    fs.mkdir(build.initialOptions.outdir).then(
                        () => {},
                        () => {}
                    ));

            build.onResolve({ filter }, (options) => {
                if (!options.importer) entry[normalize(options.path)] = true;
                return null;
            });

            build.onLoad({ filter }, async (options) => {
                const src = normalize(options.path);
                const { ext, name, base } = path.parse(src);

                const type = ext.replace(".", "");

                let id = entry[src] ? base : name + "-" + hash(src) + ext;

                const dest = path.join(build.initialOptions.outdir, id);

                await prepareDir();

                if (typeof files[type] == "function") {
                    id = await files[type]({ id, src, type, dest, share });
                } else if (!ready[src]) {
                    ready[src] = true;
                    await esbuild.build({
                        ...share,
                        entryPoints: [src],
                        outfile: dest,
                        bundle: true,
                    });
                    // sawait fs.copyFile(options.path, dest);
                }
                return {
                    loader: "js",
                    contents: id.inline
                        ? id.inline
                        : `export default new URL("./${id}",import.meta.url).href`,
                };
            });
        },
    };
}

/**
 *
 * @typedef {Object} File
 * @property {string} id
 * @property {string} src
 * @property {string} type
 * @property {string} dest
 * @property {any} share - Configuration inherited from esbuild
 */

/**
 * @typedef {string|{inline:string}} Resolve
 */
