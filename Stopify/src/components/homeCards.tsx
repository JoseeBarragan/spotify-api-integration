import type { Album, Artist, Track } from "@/types/apiTypes"

export default function HomeCards ({item, imgClass}: {item: Album | Artist | Track, imgClass?: string}) {
    return(
        <div 
            title={item.name}
            className="cursor-pointer hover:bg-neutral-800 transition-colors duration-75 ease-linear rounded-md shrink-0 w-full h-full"
        >
            <div className="flex flex-col gap-1 h-full py-3">
                <img src={ "images" in item ? item.images.at(0)?.url : item.album.images.at(0)?.url} className={`mx-auto ${imgClass}`}/>
                <h1 className="text-md px-3 text-white line-clamp-2">{item.name}</h1>
                <p className="text-xs px-3 text-neutral-300">{ "artists" in item ? item.artists.map((a) => {return a.name + " "}) : item.type}</p> 
            </div>
        </div>
    )
}