import PlayingTrackBars from "@/shared/components/playingTrackBars";
import { TrackOptions } from "@/shared/components/trackOptions";
import type { SpotifyTrack } from "@/types/apiTypes";
import { trackDurationFormat } from "@/utils/trackDurationFormat.ts"
import { useState } from "react";

export default function ArtistTopTracks ({onPlay, topTracks, trackPlaying, isPlaying}: {onPlay: (track: string) => void, topTracks: SpotifyTrack[], trackPlaying: string | null, isPlaying: boolean}) {
    const [hover, setHover] = useState<null | number>(null);
    const firstTracks = topTracks.slice(0, 5)
    const [artistTracks, setArtistTracks] = useState(firstTracks)

    const handleAmountTracks = (value: SpotifyTrack[]) => {
        setArtistTracks(value)
    }

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-3xl text-white">Populares</h1>
            <div className="flex flex-col gap-2">
                {artistTracks.map((t, i) => {
                    const isPlayingThis = trackPlaying === t.name
                    return(
                        <div key={i} className="flex items-center gap-4 w-full min-h-13 py-2 px-3 
                                rounded-sm hover:bg-neutral-700 justify-between group"
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(null)}
                                onDoubleClick={() => onPlay(t.name)}
                        >
                            <div 
                                className="flex items-center gap-4"
                            >
                                <button
                                    className={`size-8 text-lg flex items-center justify-center ${isPlayingThis ? "text-[#1ED760]": "text-white"}`}
                                    onClick={() => onPlay(t.name)}
                                >
                                    { hover === i ? (isPlayingThis ? "⏸" : "▶"): (isPlayingThis ? (isPlaying ? <PlayingTrackBars /> : `${i + 1}`) : `${i + 1}`)}
                                </button>
                                <img src={t.album.images.at(-1)?.url} alt={t.album.name} className="size-10 rounded-md" />
                                <div className="flex flex-col">
                                    <p className={`select-none ${isPlayingThis ? "text-[#1ED760]" : "text-white "}`}>{t.name}</p>
                                    { t.explicit && <p className="select-none flex items-center justify-center text-[10px] font-extrabold rounded-xs size-4 text-neutral-800 bg-neutral-300">E</p>}
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-6/12">
                                <p className="text-neutral-400">{t.album.name }</p>
                                
                                <div className="flex items-center gap-4">
                                    {hover === i && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-neutral-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>}
                                    <div className="flex gap-3">
                                        <p className="text-neutral-400">{trackDurationFormat(t.duration_ms)}</p>
                                        <TrackOptions hover={hover === i}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="text-start text-neutral-200 text-sm cursor-pointer hover:text-white font-bold"
                onClick={() => artistTracks.length === 10 ? handleAmountTracks(firstTracks) : handleAmountTracks(topTracks)}
            >
                {artistTracks.length === 10 ? "Ver menos":"Ver más"}
            </button>
        </div>
    )
}