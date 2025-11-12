export interface Swatch {
  _rgb: [number, number, number];
  _population: number;
  _hsl: [number, number, number];
}

export interface Palette {
  Vibrant?: Swatch;
  Muted?: Swatch;
  DarkVibrant?: Swatch;
  DarkMuted?: Swatch;
  LightVibrant?: Swatch;
  LightMuted?: Swatch;
}

import type { Palette, Swatch } from '@vibrant/color';

export type { Palette, Swatch };