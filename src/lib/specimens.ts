/**
 * Real typefaces of each project, for the case-study specimens.
 * Only one weight per family, Latin + Latin Extended, loaded on that case page alone.
 * Files and licence: src/assets/fonts/specimens (SIL OFL 1.1).
 */
const urls = import.meta.glob<string>('../assets/fonts/specimens/*.woff2', { query: '?url', import: 'default', eager: true });

interface Face {
  file: string;
  weight: number;
  style: 'normal' | 'italic';
  /** Uppercase specimens look right for display faces; text faces stay in sentence case. */
  upper?: boolean;
}

const faces: Record<string, Face> = {
  Anybody: { file: 'anybody', weight: 800, style: 'normal', upper: true },
  Newsreader: { file: 'newsreader', weight: 400, style: 'italic' },
  Coiny: { file: 'coiny', weight: 400, style: 'normal' },
  'Fraunces SOFT': { file: 'fraunces', weight: 600, style: 'normal' },
  Fraunces: { file: 'fraunces', weight: 600, style: 'normal' },
  'DM Mono': { file: 'dm-mono', weight: 400, style: 'normal' },
  Archivo: { file: 'archivo', weight: 800, style: 'normal', upper: true },
  'Bodoni Moda Italic': { file: 'bodoni-moda', weight: 400, style: 'italic' },
  Jost: { file: 'jost', weight: 400, style: 'normal' },
  'Big Shoulders Display': { file: 'big-shoulders-display', weight: 800, style: 'normal', upper: true },
  'Pirata One': { file: 'pirata-one', weight: 400, style: 'normal' },
  Michroma: { file: 'michroma', weight: 400, style: 'normal', upper: true },
  Manrope: { file: 'manrope', weight: 500, style: 'normal' },
  'Martian Mono': { file: 'martian-mono', weight: 400, style: 'normal' },
};

const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const LATIN_EXT =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';

const find = (name: string) => Object.entries(urls).find(([path]) => path.endsWith(`/${name}`))?.[1];

export interface Specimen {
  family: string;
  weight: number;
  style: 'normal' | 'italic';
  upper: boolean;
}

/** CSS @font-face rules plus the CSS family name for each typeface of a project. */
export function specimensFor(names: string[]) {
  const css: string[] = [];
  const map = new Map<string, Specimen>();
  const done = new Set<string>();
  for (const name of names) {
    const f = faces[name];
    if (!f) continue;
    const family = `VX Specimen ${f.file}`;
    const suffix = `${f.weight}-${f.style}`;
    if (!done.has(family)) {
      done.add(family);
      for (const [sub, range] of [['latin', LATIN], ['latin-ext', LATIN_EXT]] as const) {
        const url = find(`${f.file}-${sub}-${suffix}.woff2`);
        if (url) css.push(`@font-face{font-family:'${family}';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url(${url}) format('woff2');unicode-range:${range}}`);
      }
    }
    map.set(name, { family, weight: f.weight, style: f.style, upper: Boolean(f.upper) });
  }
  return { css: css.join(''), map };
}
