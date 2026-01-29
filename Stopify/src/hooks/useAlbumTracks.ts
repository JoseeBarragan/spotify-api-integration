import fetchAlbumTracks from "@/services/fetchAlbumTracks";
import { useQuery } from "@tanstack/react-query";

export default function useAlbumTracks (id: string) {
    return useQuery({
        queryKey: ["album-tracks", id],
        queryFn: () => fetchAlbumTracks(id),
        staleTime: 1000 * 60 * 5,
    })
}