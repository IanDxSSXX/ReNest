import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


const packageJson = require("./dist/package.json");


const rollupOutputFunc = (inputPath, outputFile, outputType) => {
    return [{
        input: inputPath,
        output: {
          file: outputFile,
          format: 'umd',
          name: 'index'
        },
        plugins: [
          typescript({ tsconfig: "tsconfig.json" }),
          commonjs(),
          nodeResolve()
        ],
        external: Object.keys(packageJson.dependencies)
      },
      {
          input: inputPath,
          output: [{ file: outputType, format: "es" }],
          plugins: [dts()],
    }]
}
const rollupDefault = [].concat(
    rollupOutputFunc('src/base/index.ts', 'dist/index.js', 'dist/index.d.ts'),
    rollupOutputFunc('src/component/index.ts', 'dist/component/index.js', 'dist/component/index.d.ts'),
    rollupOutputFunc('src/base/HTMLTags.ts', 'dist/htmlTag/index.js', 'dist/htmlTag/index.d.ts')
)

export default rollupDefault