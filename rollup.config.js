import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript'


const packageJson = require("./package.json");

export default [
  {
    input: 'src/base/index.ts',
    output: {
      file: packageJson.main,
      format: 'umd',
      name: 'index'
    },

    plugins: [
      typescript({ tsconfig: "tsconfig.json" })
    ],
    external: ["react", "react-dom", "uuid", "react-icons", "react-router-dom", "react-spring"]
  },
  {
      input: 'src/base/index.ts',
      output: [{ file: packageJson.types, format: "es" }],
      plugins: [dts()],
    },
]