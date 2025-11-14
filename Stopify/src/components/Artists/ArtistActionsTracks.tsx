import { useCallback, useState } from "react"
import ArtistTopTracks from "./ArtistTopTracks";
import type { SpotifyTrack } from "@/types/apiTypes";

export default function ArtistActionsTracks ({topTracks}: {topTracks: SpotifyTrack[]}) {
    const [playing, setPlaying] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false);


    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
    };

    const handlePlayTrack = useCallback(() => {
        setPlaying(!playing)
    }, [])


    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-3 items-center">
                <button 
                    title="Reproducir"
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center p-2 
                    shadow-lg hover:bg-green-400 transform hover:scale-105 transition-transform duration-150 active:scale-95
                    cursor-pointer
                    "
                >
                    <PlayIcon className="ml-1 size-1 sm:size-6" />
                </button>
                <button 
                    onClick={handleFollowClick}
                    className={`
                    transition-all duration-150 ease-in-out px-4 py-1.5
                    rounded-full font-semibold cursor-pointer hover:scale-105 
                    active:scale-95 border-2 select-none h-fit
                    ${isFollowing 
                        ? 'bg-zinc-900 text-white border-white/70 hover:border-white' 
                        : 'bg-white text-black border-white' 
                    }
                    `}>
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
            </div>
            <ArtistTopTracks onPlay={handlePlayTrack} topTracks={topTracks}/>
        </div>
    )
}

const PlayIcon = ({ className }: {className: string}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}>
    <polygon fill="black" points="5 3 19 12 5 21 5 3" />
  </svg>
);
