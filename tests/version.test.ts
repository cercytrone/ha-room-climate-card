import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guards the release metadata. This exists because v1.1.3 and v1.1.4 were once
 * published *after* v1.2.0: every single artefact was fine on its own, but the
 * version numbers went backwards, and HACS (which picks the highest semver)
 * kept offering 1.2.0 without the newer features.
 */

const root = resolve(__dirname, '..');

function read(relative: string): string {
  return readFileSync(resolve(root, relative), 'utf8');
}

function parseVersion(value: string): number[] {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(value.trim());
  if (!match) throw new Error(`not a semantic version: "${value}"`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compare(a: string, b: string): number {
  const left = parseVersion(a);
  const right = parseVersion(b);
  for (let index = 0; index < 3; index++) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

const packageVersion = JSON.parse(read('package.json')).version as string;
const changelog = read('CHANGELOG.md');
const changelogVersions = [...changelog.matchAll(/^## \[([0-9]+\.[0-9]+\.[0-9]+)\]/gm)].map(
  (match) => match[1]
);

describe('release metadata', () => {
  it('uses a semantic version in package.json', () => {
    expect(() => parseVersion(packageVersion)).not.toThrow();
  });

  it('lists the newest version first in the changelog', () => {
    expect(changelogVersions.length).toBeGreaterThan(0);
    expect(changelogVersions[0]).toBe(packageVersion);
  });

  it('never goes backwards in the changelog', () => {
    // This is the check that would have caught 1.1.3 / 1.1.4 after 1.2.0.
    for (let index = 1; index < changelogVersions.length; index++) {
      const previous = changelogVersions[index - 1];
      const current = changelogVersions[index];
      expect(
        compare(previous, current),
        `CHANGELOG: ${current} is listed after ${previous} – version numbers must decrease`
      ).toBeGreaterThan(0);
    }
  });

  it('contains no duplicate changelog entries', () => {
    expect(new Set(changelogVersions).size).toBe(changelogVersions.length);
  });

  it('embeds the current version in the committed bundle', () => {
    // The bundle is committed and shipped, so a stale build is a broken release.
    const bundle = read('dist/ha-room-climate-card.js');
    expect(bundle).toContain(`"${packageVersion}"`);
  });

  it('documents the current version in the README', () => {
    expect(read('README.md')).toContain(`ROOM-CLIMATE-CARD v${packageVersion}`);
  });
});
