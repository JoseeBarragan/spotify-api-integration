export const prerender = false;
import type { APIRoute } from "astro"
import { Vibrant } from "node-vibrant/node";

export const ALL: APIRoute = async ({ request }) => {
    const img = request.url.split("GradientColors/")[1]

    const palette = await Vibrant.from(img ?? "").getPalette();
    return new Response(JSON.stringify({
        colors: palette
    }));
}