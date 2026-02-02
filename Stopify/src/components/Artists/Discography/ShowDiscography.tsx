import type { ArtistAlbumsResponse } from "@/types/apiTypes";
import { lazy, useState } from "react";
const ShowGridDiscography = lazy(() => import("./ShowGridDiscography"));
const ShowListDiscography = lazy(() => import("./ShowListDiscography"));

export default function ShowDiscography ({discography, discographyType, filter, type}: {discography: ArtistAlbumsResponse, discographyType: string, filter: {sortBy: "release" | "name", orderAsc: boolean}, type: "list" | "grid"}) {
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const filtered = discography.items.sort((a, b) => {
        if(filter.sortBy === "name") {
            return filter.orderAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        const [yA, mA, dA] = a.release_date.split("-").map(Number);
        const [yB, mB, dB] = b.release_date.split("-").map(Number);

        const timeA = new Date(yA!, mA! - 1, dA).getTime();
        const timeB = new Date(yB!, mB! - 1, dB).getTime();

        return filter.orderAsc ? timeA - timeB : timeB - timeA;
    })

    const filteredDiscography = discographyType === "todo" ? filtered : filtered.filter(fd => {
        if(discographyType === "album") {
            return fd.album_type === "album"
        }
        return fd.album_type === "single"
    }) 

    return (
        <div>
            {   
                type === "grid" ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 mt-6">
                        {
                            filteredDiscography.map(fd => (
                                <ShowGridDiscography key={fd.id} fd={fd}/>
                            ))
                        }
                    </div>
                ) : (
                    filteredDiscography.map(fd => (
                        <ShowListDiscography key={fd.id} fd={fd} currentTrackId={currentTrackId} isPlaying={isPlaying} setCurrentTrackId={setCurrentTrackId} setIsPlaying={setIsPlaying}/>
                    ))
                )
            }
        </div>
    )
}