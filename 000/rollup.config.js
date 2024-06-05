import typescript from "@rollup/plugin-typescript";

export default {
    input: './main.ts',
    output: {
        dir: 'output',
        format: 'iife',
        name: 'app',
        sourcemap: 'inline'
    },
    plugins: [typescript()]
}