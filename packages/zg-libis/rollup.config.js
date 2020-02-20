import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript';
import tsconfig from './tsconfig.json'

export default [

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		// external: ['validate'],
		output: [
			{ name:'bundle', file: pkg.iife, format: 'iife', legacy: true, sourcemap: true },
			{ name:'bundle', file: pkg.browser, format: 'umd', legacy: true, sourcemap: true },
		],
		plugins: [
			// sass({ insert: true }),
			typescript(tsconfig.compilerOptions),
			postcss({
				extensions:['.css', '.sss', '.pcss','scss'],
				extract:false
			}),
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	}
];