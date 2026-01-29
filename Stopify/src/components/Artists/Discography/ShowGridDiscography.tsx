import HomeCards from "@/components/homeCards";
import type { SimplifiedAlbum } from "@/types/apiTypes";

export default function ShowGridDiscography ({fd}: {fd: SimplifiedAlbum}) {
    return (
        <HomeCards item={fd} imgClass="min-h-[175px] w-[170px] rounded-md"/>
    )
}