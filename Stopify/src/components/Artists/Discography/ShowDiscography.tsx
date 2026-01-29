import type { ArtistAlbumsResponse } from "@/types/apiTypes";
import { lazy } from "react";
const ShowGridDiscography = lazy(() => import("./ShowGridDiscography"));
const ShowListDiscography = lazy(() => import("./ShowListDiscography"));

export default function ShowDiscography ({discography, filter, type}: {discography: ArtistAlbumsResponse, filter: "name" | "release", type: "list" | "grid"}) {
    
    const filteredDiscography = discography.items.sort((a, b) => {
        if(filter === "name") {
            return a.name.localeCompare(b.name)
        }
        return a.name.localeCompare(b.name)
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
                        <ShowListDiscography key={fd.id} fd={fd}/>
                    ))
                )
            }
        </div>
    )
}