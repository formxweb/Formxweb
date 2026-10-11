const words = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on'];

/** 7 → "yedi"; falls back to digits above ten. */
export const countWord = (n: number) => words[n] ?? String(n);

/** "yedi" → "Yedi" with Turkish casing rules. */
export const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
