export const prerender = false;
import type { APIRoute } from "astro";
import { getCache, setCache } from "../../../utils/cache";
import { getTokenFromFile } from "src/utils/tokenStore";
import refreshToken from "src/services/refreshToken";

export const ALL: APIRoute = async ({ request }) => {
    const path = request.url.split("spotify/")[1]
    const url = `https://api.spotify.com/v1/${path}`
    const cacheKey = url
    const accessToken = await getTokenFromFile()
    console.log("fetch al endpoint: ", url, "accessToken: ", accessToken)
    const cached = getCache(cacheKey)
    if (cached && (typeof (cached as any).error === "undefined")) {
        return new Response(JSON.stringify(cached), {
            headers: { "Content-Type": "application/json", "X-Cache": "HIT" }
        })
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    if (res.status === 401) {
        setCache(cacheKey, null)
        return new Response(JSON.stringify({ expired: true }), {
            status: 401
        })
    }
    const data = await res.json()

    setCache(cacheKey, data)

    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json", "X-Cache": "MISS" }
    })
}