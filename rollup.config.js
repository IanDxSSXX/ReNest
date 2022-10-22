import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

let rootName = "./package"

function generatePackage(inputPath) {
    let packageJson = require(`${rootName}/package.json`)
    return [{
        input: inputPath,
        output: [{
            file: `${rootName}/index.js`,
            format: 'esm',
            sourcemap: true
        }, {
            file: `${rootName}/index.cjs.js`,
            format: 'cjs',
            sourcemap: true
        }],
        plugins: [
            typescript({ tsconfig: "tsconfig.json" }),
            commonjs(),
            nodeResolve(),
            terser()
        ],
        external: Object.keys(packageJson.dependencies)
    }, {
        input: inputPath,
        output: {
           dir: `${rootName}/`,
           format: "esm"
        },
        plugins: [
           dts()
        ]
    }]
}


export default generatePackage("src/core/index.ts")