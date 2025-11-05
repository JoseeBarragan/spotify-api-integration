import { getSecret } from "astro:env/server"
import { saveTokenToFile } from "src/utils/tokenStore"

const CLIENTID = getSecret("SPOTIFY_CLIENT_ID")
const CLIENTSECRET = getSecret("SPOTIFY_CLIENT_SECRET")

export default async function refreshToken() {
    const response = await fetch(`https://accounts.spotify.com/api/token`,{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${CLIENTID}&client_secret=${CLIENTSECRET}`
    })    

    if (!response.ok) throw new Error("Ups! ocurrio un error al querer refrezcar el token")
        
    const data = await response.json()
    await saveTokenToFile(data.access_token, data.expires_in)
    return data
}