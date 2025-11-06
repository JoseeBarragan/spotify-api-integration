import fs from "fs"
import path from "path"

// The token is stored in a file because astro execute this on the Server Side of the app

const file = path.resolve("./.spotify-token.json")

export async function getTokenFromFile() {
  try {
    const raw = fs.readFileSync(file, "utf-8")
    const data = JSON.parse(raw)
    if (Date.now() < data.expiresAt) return data.accessToken
  } catch {}
  return null
}

export async function saveTokenToFile(token: string, expiresIn: number) {
  const expiresAt = Date.now() + expiresIn * 1000 - 60_000
  fs.writeFileSync(file, JSON.stringify({ accessToken: token, expiresAt }))
}