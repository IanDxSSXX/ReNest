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
    external: ["@react-spring/web", "@types/node", "@types/react", "@types/react-dom", "@types/uuid",
    "react", "react-dom", "react-icons", "react-router-dom", "typescript"]
  },
  {
      input: 'src/base/index.ts',
      output: [{ file: packageJson.types, format: "es" }],
      plugins: [dts()],
    },
]