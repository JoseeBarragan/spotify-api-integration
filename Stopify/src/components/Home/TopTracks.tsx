import type { PlaylistTracksResponse } from "@/types/apiTypes";
import Carrousel from "../Carrousel";
import { SwiperSlide } from "swiper/react";
import HomeCards from "../homeCards";
import { useEffect, useState } from "react";
import HomeCardsSkeleton from "../Skeletons/HomeCardsSkeleton";

export default function TopTracks ({FRONTEND_URL}: {FRONTEND_URL: string | undefined}) {
    const [topTracks, setTopTracks] = useState<null | PlaylistTracksResponse>(null)
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const first10Tracks = topTracks?.items?.slice(0, 15)

    useEffect(() => {
          (async () => {
            try{
              setLoading(true)
              const response = await fetch(`${FRONTEND_URL}/api/spotify/playlists/1JVocmG0dGNuEFcQgnMZus/tracks`)
              if (!response.ok) throw new Error("Error al buscar los datos")
              const data = await response.json()
              setTopTracks(data)
              console.log(data)
            }
            catch(err) {
              console.log("err")
              setError(true)
            }
            finally {
              setLoading(false)
            }
          })()
        }, [FRONTEND_URL])

    return (
      <>
        {
          !isLoading ? (
            <div className="flex flex-col">
                <h1 className="text-2xl text-white mb-4 ">Top 50</h1>
                <Carrousel>
                  {first10Tracks?.map(item => (
                    <SwiperSlide
                      key={item.track.id}
                      style={{ width: "195px" }}
                    >
                      <HomeCards item={item.track} imgClass="min-h-[190px] w-[175px] rounded-md"/>
                    </SwiperSlide>
                  ))}
                </Carrousel>
            </div>
          ) : (
            <HomeCardsSkeleton title="Top 50"/>
          )
        }
      </>
    )
}