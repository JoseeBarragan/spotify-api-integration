import useAlbumTracks from "@/hooks/useAlbumTracks";
import PlayingTrackBars from "@/shared/components/playingTrackBars";
import type { AlbumTracksResponse, SimplifiedAlbum } from "@/types/apiTypes";
import { trackDurationFormat } from "@/utils/trackDurationFormat";
import { useState, type Dispatch, type SetStateAction } from "react";

export default function ShowListDiscography ({fd, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId}: {setIsPlaying: Dispatch<SetStateAction<boolean>>, setCurrentTrackId: Dispatch<SetStateAction<string | null>>, fd: SimplifiedAlbum, isPlaying: boolean, currentTrackId: string | null}) {
    const {data, isLoading, isError} = useAlbumTracks(fd.id) 

    const handlePlay = (trackId: string) => {
      if (currentTrackId === trackId) {
        setIsPlaying(v => !v);
      } else {
        setCurrentTrackId(trackId);
        setIsPlaying(true);
      }
    }

    return (
        <div className="my-15">                       
            <div className="flex ml-7">
                <img src={fd.images.at(-2)?.url || ""} alt="" className="size-35 rounded-sm" />
                <div className="ml-5">
                    <h1 className="text-white font-semibold text-2xl">{fd.name}</h1>
                    <div className="flex items-center mt-2">
                        <p className="text-neutral-400 text-sm capitalize">{fd.album_type}</p>
                        <span className="ml-1 size-1 bg-neutral-400 inline-block rounded-full"></span>
                        <p className="text-neutral-400 ml-1 text-sm">{fd.release_date.split("", 4)}</p>
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                        <svg width={40} height={40} className="hover:scale-110 transition-all duration-75 ease-in-out cursor-pointer" viewBox="0 0 24 24" fill="none">
                            <circle fill="white" cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="2" />
                            <polygon points="10,8 16,12 10,16" fill="currentColor" />
                        </svg>
                        <svg width={35} height={35} viewBox="0 0 24 24" fill="none" className="cursor-pointer">
                            <circle cx="12" cy="12" r="8" stroke="#7f7f7f" strokeWidth="1.5" />
                            <path d="M12 8v8M8 12h8" stroke="#7f7f7f" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <svg width={35} height={35} viewBox="0 0 24 24" fill="none" className="cursor-pointer">
                          <circle cx="12" cy="12" r="8" stroke="#7f7f7f" strokeWidth="1.5" />
                          <path
                            d="M12 8.5v6m0 0l-3-3m3 3l3-3"
                            stroke="#7f7f7f"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg width={35} height={35} viewBox="0 0 24 24" fill="none" className="cursor-pointer ">
                          <circle cx="7" cy="12" r="1" fill="#7f7f7f" />
                          <circle cx="12" cy="12" r="1" fill="#7f7f7f" />
                          <circle cx="17" cy="12" r="1" fill="#7f7f7f" />
                        </svg>
                    </div>
                </div>
            </div>
            <TracksTable tracks={data} fd={fd} handlePlay={handlePlay} isPlaying={isPlaying} currentTrackId={currentTrackId}/> 
        </div>
    )
} 

function TracksTable ({tracks, fd, handlePlay, isPlaying, currentTrackId}: {isPlaying: boolean, currentTrackId: string | null, tracks: AlbumTracksResponse, fd: SimplifiedAlbum, handlePlay: (id: string) => void}) {
    return (
        <div className="mt-8">
            <table className="w-full border-collapse text-sm text-neutral-300">
                <thead className="group">
                    <tr className="border-b border-neutral-800 text-neutral-400">
                        <th className="px-4 py-1 text-left w-8 text-lg">#</th>
                        <th className="px-4 py-1 text-left font-light">Título</th>
                        <th className="px-4 py-1 text-left font-light w-4/12"><p className="border-x border-transparent group-hover:border-x group-hover:border-neutral-500 px-2">Album</p></th>
                        <th className="px-4 py-1 text-center w-25 text-2xl">⏱</th>
                    </tr>
                    <tr>
                        <th colSpan={100} className="h-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {tracks?.items?.map((track, index) => {
                        const isCurrent = track.id === currentTrackId;

                        return (
                          <tr
                            key={track.id}
                            className="group hover:bg-neutral-700/50 h-13"
                          >
                            <td
                              onClick={() => handlePlay(track.id)}
                              className="px-4 py-2 rounded-l-sm text-neutral-400 cursor-pointer"
                            >
                              {!isCurrent && (
                                <>
                                  <span className="group-hover:hidden">{index + 1}</span>
                                  <span className="hidden group-hover:inline text-white text-lg">
                                    ▶
                                  </span>
                                </>
                              )}

                              {isCurrent && (
                                isPlaying ? <PlayingTrackBars /> : <span className={`${currentTrackId === track.id ? "text-green-500" : "text-white"}`}>⏸</span>
                              )}
                            </td>

                            <td className="px-4 py-2 flex flex-col gap-1 truncate max-w-100">
                              <span className={isCurrent ? "text-green-500" : "text-white"}>
                                {track.name}
                              </span>
                          
                              <div className="flex gap-2">
                                {track.explicit && (
                                  <p className="select-none flex pt-0.5 justify-center text-[10px] font-extrabold rounded-xs size-4 text-neutral-800 bg-neutral-300">
                                    E
                                  </p>
                                )}

                                {track.artists.map((artist, i) => (
                                  <p key={artist.id} className="text-xs text-neutral-400">
                                    {artist.name}
                                    {track.artists[i + 1] ? ", " : ""}
                                  </p>
                                ))}
                              </div>
                            </td>
                            
                            <td className="px-4 py-2 text-neutral-400">{fd.name}</td>
                            
                            <td className="px-4 py-2 text-right rounded-r-sm text-neutral-400">
                              <div className="flex items-center justify-end gap-3">
                                <span>{trackDurationFormat(track.duration_ms)}</span>
                                <button className="opacity-0 group-hover:opacity-100 transition">
                                  ⋯
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
