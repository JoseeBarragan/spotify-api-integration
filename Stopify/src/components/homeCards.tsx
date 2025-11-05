import type { Album } from "src/interfaces/apiTypes";


export default function HomeCards ({album}: {album: Album}) {
    return(
        <div 
            title={album.name}
            className="cursor-pointer hover:bg-neutral-800 transition-colors duration-150 ease-in-out rounded-md flex-shrink-0 w-full h-full"
        >
            <div className="flex flex-col gap-1 h-full py-3">
                <img src={album.images.at(-1)?.url} className="mx-auto rounded-md min-h-[205px] w-[195px]"/>
                <h1 className="text-md px-3 text-white line-clamp-2">{album.name}</h1>
                <p className="text-xs px-3 text-neutral-300">{album.artists.map((a) => {return a.name + " "})}</p>
            </div>
        </div>
    )
}