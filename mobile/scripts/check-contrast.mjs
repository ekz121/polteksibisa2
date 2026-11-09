import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/constants/theme.ts', import.meta.url), 'utf8');
const colors = Object.fromEntries([...source.matchAll(/(\w+): '(#[A-Fa-f0-9]{6})'/g)].map((match) => [match[1], match[2]]));

function luminance(hex) {
  const channels = hex.match(/[A-Fa-f0-9]{2}/g).map((channel) => parseInt(channel, 16) / 255);
  const [r, g, b] = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const pairs = [
  ['text', 'surface', 4.5], ['muted', 'surface', 4.5], ['muted', 'background', 4.5],
  ['primary', 'surface', 4.5], ['primary', 'softRed', 4.5],
  ['surface', 'primary', 4.5], ['surface', 'primaryLight', 4.5], ['surface', 'wave', 4.5],
  ['headerMuted', 'primary', 3], ['headerMuted', 'primaryLight', 3], ['headerMuted', 'wave', 3],
  ['focus', 'surface', 3], ['focus', 'background', 3],
];

let failed = false;
for (const [foreground, background, minimum] of pairs) {
  const values = [luminance(colors[foreground]), luminance(colors[background])].sort((a, b) => b - a);
  const ratio = (values[0] + 0.05) / (values[1] + 0.05);
  const pass = ratio >= minimum;
  failed ||= !pass;
  console.log((pass ? 'PASS' : 'FAIL') + ' ' + foreground + '/' + background + ': ' + ratio.toFixed(2) + ':1 (minimum ' + minimum + ')');
}
process.exitCode = failed ? 1 : 0;
