import type { SpotifyTrack } from "@/types/apiTypes";

export default function ArtistTopTracks ({onPlay, topTracks}: {onPlay: () => void, topTracks: SpotifyTrack[]}) {
    const firstTracks = topTracks.slice(0, 5)
    
    return (
        <div>
            <h1 className="font-bold text-2xl text-white">Populares</h1>
            <div className="flex flex-col gap-2">
                {firstTracks.map((t, i) => (
                    <div className="flex w-full py-2 bg-black border-2 border-white rounded-sm">
                        <p className="text-white">{i + 1}</p>
                        <p className="text-white">{t.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}