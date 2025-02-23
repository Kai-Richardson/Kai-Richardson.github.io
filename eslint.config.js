import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	...eslintPluginSvelte.configs['flat/prettier'],
	eslintConfigPrettier,
	{
		ignores: ['.svelte-kit/*', 'build/*']
	}
];
