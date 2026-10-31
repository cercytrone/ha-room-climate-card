import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { KNOWN_CONFIG_KEYS, normalizeConfig, resetUnknownKeyWarnings } from '../src/config';

/**
 * The example cards are the first thing people copy. A key that was removed in
 * an earlier major version must not survive there: it would be silently ignored
 * (and since 2.5.0 it also prints a warning), which looks like a broken card
 * instead of an outdated example.
 */
const EXAMPLES_DIR = join(process.cwd(), 'examples');

function topLevelKeys(yaml: string): string[] {
  return yaml
    .split('\n')
    .map((line) => line.match(/^([a-z_][a-z0-9_]*)\s*:/)?.[1])
    .filter((key): key is string => Boolean(key));
}

describe('example configurations', () => {
  const files = readdirSync(EXAMPLES_DIR).filter((name) => name.endsWith('.yaml'));

  it('finds the examples', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s only uses known keys', (file) => {
    const yaml = readFileSync(join(EXAMPLES_DIR, file), 'utf8');
    const unknown = topLevelKeys(yaml).filter((key) => !KNOWN_CONFIG_KEYS.includes(key));
    expect(unknown).toEqual([]);
  });

  it.each(files)('%s parses without warnings', (file) => {
    const yaml = readFileSync(join(EXAMPLES_DIR, file), 'utf8');
    const config: Record<string, unknown> = { type: 'custom:room-climate-card' };
    for (const line of yaml.split('\n')) {
      const match = line.match(/^([a-z_][a-z0-9_]*)\s*:\s*(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (key === 'type') continue;
      const value = rawValue.replace(/\s+#.*$/, '').trim();
      if (!value) continue;
      config[key] = value === 'true' ? true : value === 'false' ? false : value;
    }
    resetUnknownKeyWarnings();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      normalizeConfig(config);
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
      resetUnknownKeyWarnings();
    }
  });
});
