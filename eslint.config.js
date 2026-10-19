import { defineConfig } from 'eslint/config';
import apostrophe from 'eslint-config-apostrophe';

export default defineConfig([
  // Ignores public/, apos-build/ and data/, which .eslintignore used to list.
  apostrophe,
  {
    // ESLint 9 lints only .js, .mjs and .cjs unless a config names other
    // extensions. The shared config enables JSX parsing and the React rules
    // for these files.
    files: [ '**/*.jsx' ],
    rules: {
      // Templates write attributes the way HTML does, as every example in
      // AGENTS.md shows.
      '@stylistic/jsx-quotes': [ 'error', 'prefer-double' ],
      // JSX here renders on the server only. With no client reconciler,
      // `key` does nothing, and AGENTS.md says not to add it.
      'react/jsx-key': 'off'
    }
  },
  {
    languageOptions: {
      globals: {
        apos: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
]);
