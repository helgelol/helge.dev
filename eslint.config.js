import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import solidPlugin from 'eslint-plugin-solid';

export default [
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			solid: solidPlugin
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...solidPlugin.configs.recommended.rules
		}
	}
];
