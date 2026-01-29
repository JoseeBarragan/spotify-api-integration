import useAlbumTracks from "@/hooks/useAlbumTracks";
import type { SimplifiedAlbum } from "@/types/apiTypes";

export default function ShowListDiscography ({fd}: {fd: SimplifiedAlbum}) {
    const {data, isLoading, isError} = useAlbumTracks(fd.id) 
    console.log(data)
    return (
        <div className="my-15">                       
            <div className="flex">
                <img src={fd.images.at(-1)?.url || ""} alt="" className="size-35 rounded-sm" />
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

        </div>
    )
} 

function TracksTable () {
    
}