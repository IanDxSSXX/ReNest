import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

let rootName = "./packages"

function generatePackage(packageName, inputPath) {
    let packageJson = require(`${rootName}/${packageName}/package.json`)
    return [{
        input: inputPath,
        output: [{
          file: `${rootName}/${packageName}/index.js`,
          format: 'esm',
          sourcemap: true
        }, {
            file: `${rootName}/${packageName}/index.cjs.js`,
            format: 'cjs',
            sourcemap: true
        }],
        plugins: [
            typescript({ tsconfig: "tsconfig.json" }),
            commonjs(),
            nodeResolve()
        ],
        external: Object.keys(packageJson.dependencies)
    }, {
        input: inputPath,
        output: {
           dir: `${rootName}/${packageName}/`,
           format: "esm"
        },
        plugins: [
           dts()
        ]
    }]
}



let option = 0

let config
switch(option) {
    case 0:
        config = generatePackage("core", "src/core/index.ts")
        break
    case 1:
        config = generatePackage("component", "src/component/index.ts")
        break
    default:
}

export default config