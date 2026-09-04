import eslint from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import astro from 'eslint-plugin-astro';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const elementTypes = [
  'engine',
  'world',
  'doc',
  'a11y',
  'content',
  'strings',
  'styles',
  'pages',
  'tools',
];

const featureDependencies = {
  engine: ['engine'],
  world: ['world', 'engine', 'content', 'strings', 'styles'],
  doc: ['doc', 'engine', 'content', 'strings', 'styles'],
  a11y: ['a11y', 'engine', 'content', 'strings', 'styles'],
  content: ['content'],
  strings: ['strings'],
  styles: ['styles'],
  pages: elementTypes.filter((elementType) => elementType !== 'tools'),
  tools: ['content', 'strings'],
};

const aliasedFeatureDependencies = {
  engine: ['three', 'three/**', '@/engine/**'],
  world: [
    '**',
    '!@/**',
    '@/world/**',
    '@/engine/**',
    '@/content/**',
    '@/content.config',
    '@/strings/**',
    '@/styles/**',
  ],
  doc: [
    '**',
    '!@/**',
    '@/doc/**',
    '@/engine/**',
    '@/content/**',
    '@/content.config',
    '@/strings/**',
    '@/styles/**',
  ],
  a11y: [
    '**',
    '!@/**',
    '@/a11y/**',
    '@/engine/**',
    '@/content/**',
    '@/content.config',
    '@/strings/**',
    '@/styles/**',
  ],
  pages: ['**'],
  tools: ['**', '!@/**', '@/content/**', '@/content.config', '@/strings/**'],
  content: ['**', '!@/**', '@/content/**', '@/content.config'],
  strings: ['**', '!@/**', '@/strings/**'],
  styles: ['**', '!@/**', '@/styles/**'],
};

const importOrder = [
  'error',
  {
    alphabetize: { order: 'asc', caseInsensitive: true },
    groups: [
      'builtin',
      'external',
      'internal',
      ['parent', 'sibling', 'index'],
      'object',
      'type',
      'unknown',
    ],
    'newlines-between': 'always',
    pathGroups: [
      { pattern: '@/**', group: 'internal', position: 'after' },
      { pattern: '**/*.css', group: 'unknown', position: 'after' },
    ],
    pathGroupsExcludedImportTypes: ['builtin'],
  },
];

export default [
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'public/',
      '*.config.*',
      'playwright-report/',
      'test-results/',
    ],
  },
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommendedTypeChecked.map((configuration) => ({
    ...configuration,
    files: ['**/*.{ts,tsx}'],
  })),
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'import/no-default-export': 'error',
      'import/order': importOrder,
    },
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ['**/*.tsx'],
  },
  {
    files: ['**/*.astro'],
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'import/order': importOrder,
    },
  },
  {
    files: ['src/**/*.{ts,tsx,astro}', 'tools/**/*.ts'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'engine', pattern: 'src/engine/**' },
        { type: 'world', pattern: 'src/world/**' },
        { type: 'doc', pattern: 'src/doc/**' },
        { type: 'a11y', pattern: 'src/a11y/**' },
        { type: 'content', pattern: 'src/content/**' },
        { type: 'content', pattern: 'src/content.config.ts', mode: 'file' },
        { type: 'strings', pattern: 'src/strings/**' },
        { type: 'styles', pattern: 'src/styles/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'pages', pattern: 'src/layouts/**' },
        { type: 'tools', pattern: 'tools/**' },
      ],
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts', '.tsx', '.astro', '.json'],
        },
      },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkInternals: true,
          policies: Object.entries(featureDependencies).map(([from, allowedTypes]) => ({
            from: { element: { type: from } },
            allow: { to: { element: { types: { anyOf: allowedTypes } } } },
          })),
        },
      ],
      'boundaries/external': [
        'error',
        {
          default: 'disallow',
          policies: Object.entries(aliasedFeatureDependencies).map(([from, allow]) => ({
            from: { element: { type: from } },
            allow,
          })),
        },
      ],
    },
  },
  {
    files: ['src/**/index.ts', 'src/**/index.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Program',
          message: 'Barrel files are forbidden; import modules from their defining files.',
        },
      ],
    },
  },
];
