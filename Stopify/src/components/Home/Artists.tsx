import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Artist } from "@/types/apiTypes";
import Cards from "../homeCards";
import Carrousel from "../Carrousel";
import { useEffect, useState } from "react";
import HomeCardsSkeleton from "../Skeletons/HomeCardsSkeleton";

const artistsIds = "4q3ewBCX7sLwd24euuV69X,06HL4z0CvFAxyc27GXpf02,0C8ZW7ezQVs4URX5aX7Kqx,1mcTU81TzQhprhouKaTkpq,6wWVKhxIU2cEi0K81v7HvP,1Xyo4u8uXC1ZmMpatF05PJ,3TVXtAsR1Inumwj472S9r4,6qqNVTkY8uBg9cP3Jd7DAH,6eUKZXaKkcviH0Ku9w2n3V,6M2wZ9GZgrQXHCFfjv46we"


export default function TopArtists({ FRONTEND_URL }: {FRONTEND_URL: string | undefined}) {
    const [topArtists, setTopArtists] = useState<Artist[] | undefined>(undefined)
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
      (async () => {
        try{
          setLoading(true)
          const response = await fetch(`${FRONTEND_URL}/api/spotify/artists?ids=${artistsIds}`)
          if (!response.ok) throw new Error("Error al buscar los datos")
          const data = await response.json()
          setTopArtists(data.artists)
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
                <h1 className="text-2xl text-white mb-4">Top Artistas</h1>
                  <Carrousel>
                    {topArtists?.map(artist => (
                      <SwiperSlide
                        key={artist.id}
                        style={{ width: "195px" }}
                      >
                        <a href={`/artists/${artist.id}`}>
                          <Cards item={artist} imgClass="rounded-full size-[175px]" />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Carrousel>
            </div>
          ) : (
            <HomeCardsSkeleton title="Top Artistas"/>
          )
        }
      </>
    );
}
