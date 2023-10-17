module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'prettier',
		'plugin:svelte/prettier',
		'plugin:svelte/recommended'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
