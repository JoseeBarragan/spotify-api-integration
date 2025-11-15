import type { SpotifyTrack } from "@/types/apiTypes";
import { trackDurationFormat } from "@/utils/trackDurationFormat.ts"
import { useState } from "react";

export default function ArtistTopTracks ({onPlay, topTracks}: {onPlay: () => void, topTracks: SpotifyTrack[]}) {
    const [hover, setHover] = useState<null | number>(null);
    const firstTracks = topTracks.slice(0, 5)

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl text-white">Populares</h1>
            <div className="flex flex-col gap-2">
                {firstTracks.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 w-full min-h-13 py-2 px-3 bg-neutral-900 
                            rounded-sm hover:bg-neutral-700 cursor-pointer justify-between group"
                            onMouseEnter={() => setHover(i)}
                            onMouseLeave={() => setHover(null)}
                    >
                        <div 
                            className="flex items-center gap-4"
                        >
                            <p
                                className="w-6 h-6 flex items-center justify-center text-white"
                            >
                                {hover === i ? "▶" : `${i + 1}`}
                            </p>
                            <img src={t.album.images.at(-1)?.url} className="size-10 rounded-md" />
                            <div className="flex flex-col">
                                <p className="text-white">{t.name}</p>
                                { t.explicit && <p className="flex items-center justify-center text-[10px] font-extrabold rounded-xs size-4 text-neutral-800 bg-neutral-300">E</p>}
                            </div>
                        </div>
                        <div className="flex justify-between w-6/12">
                            <p className="text-neutral-400">{t.album.name }</p>
                            
                            <div className="flex gap-6">
                                {hover === i && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-neutral-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>}
                                <p className="text-neutral-400">{trackDurationFormat(t.duration_ms)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}