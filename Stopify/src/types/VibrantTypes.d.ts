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

// SE AGREGA ESTAS LINEAS POR UN PROBLEMA DE TIPADO CON TS

import type { Palette, Swatch } from '@vibrant/color';

export type { Palette, Swatch };