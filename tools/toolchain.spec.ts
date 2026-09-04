import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

interface TypeScriptConfiguration {
  compilerOptions?: {
    strict?: boolean;
    noUncheckedIndexedAccess?: boolean;
    noImplicitOverride?: boolean;
    paths?: Record<string, string[]>;
  };
}

describe('NFR-CODE-002 toolchain safeguards', () => {
  it('keeps strict TypeScript checks and the source alias enabled', async () => {
    const configurationPath = path.join(process.cwd(), 'tsconfig.json');
    const configuration = JSON.parse(
      await readFile(configurationPath, 'utf8'),
    ) as TypeScriptConfiguration;

    expect(configuration.compilerOptions?.strict).toBe(true);
    expect(configuration.compilerOptions?.noUncheckedIndexedAccess).toBe(true);
    expect(configuration.compilerOptions?.noImplicitOverride).toBe(true);
    expect(configuration.compilerOptions?.paths?.['@/*']).toEqual(['src/*']);
  });
});
