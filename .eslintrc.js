module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		mocha: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [2, 'tab'],
		'no-unused-vars': ['error', { varsIgnorePattern: '^_$' }],
		'no-trailing-spaces': 'error',
		'max-len': ['error', { code: 80, ignoreComments: true }],
		'comma-dangle': ['error', 'always-multiline'],
		'object-curly-spacing': ['error', 'always'],
		'require-await': 'error',
		semi: [2, 'never'],
		"eol-last": ["error", "always"],
	},
}
