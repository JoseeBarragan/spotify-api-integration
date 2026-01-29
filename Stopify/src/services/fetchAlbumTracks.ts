export default async function fetchAlbumTracks (id: string) {
    const response = await fetch(`/api/spotify/albums/${id}/tracks`)
    if(!response.ok) throw new Error("Ups! ocurrio un error al buscar las canciones")
    
    const data = await response.json()
    return data
}