import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	{
		ignores: ['build/**', '.svelte-kit/**']
	},
	...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
	sveltePlugin.configs.recommended,

	prettier,

	{
		files: ['**/*.{js,ts,cjs,mjs}'],

		languageOptions: {
			parser: tsParser,
			sourceType: 'module',
			ecmaVersion: 2020,
			parserOptions: {
				extraFileExtensions: ['.svelte']
			},

			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			'@typescript-eslint': typescriptEslint,
			svelte: sveltePlugin
		}
	},

	{
		files: ['**/*.svelte'],

		languageOptions: {
			parser: svelteParser,

			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		rules: {
			'svelte/no-compiler-warnings': 'off',
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
]);
