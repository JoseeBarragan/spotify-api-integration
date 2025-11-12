import type { Palette } from "@/types/VibrantTypes";

type HexPaletteNames = "Vibrant" | "DarkVibrant" | "LightVibrant" | "Muted" | "DarkMuted" | "LightMuted"

type HexPalette = {
    Vibrant: string,
    DarkVibrant: string, 
    LightVibrant: string,
    Muted: string, 
    DarkMuted: string,
    LightMuted: string
}

export function TurnRgbToHex (rgb: number[]) {
    return `#${rgb.map(x => Math.round(x).toString(16).padStart(2, "0")).join("")}`;
}

export function GetPaletteHex (palette: Palette | null): HexPalette {
    return Object.entries(palette ?? {}).reduce((acc, [key, swatch]) => {
        if (swatch?._rgb) acc[key as HexPaletteNames] = TurnRgbToHex(swatch._rgb);
        return acc;
    }, {} as Record<HexPaletteNames, string>);
}