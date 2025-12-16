import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Album } from "@/types/apiTypes";
import Cards from "../homeCards";
import Carrousel from "../Carrousel";
import { useEffect, useState } from "react";
import HomeCardsSkeleton from "../Skeletons/HomeCardsSkeleton";

export default function NewReleases({FRONTEND_URL}: {FRONTEND_URL: string | undefined}) {
    const [newRealeases, setNewRealeases] = useState<Album[] | undefined>(undefined)
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
      (async () => {
        try{
          setLoading(true)
          const response = await fetch(`${FRONTEND_URL}/api/spotify/browse/new-releases?limit=15`)
          if (!response.ok) throw new Error("Error al buscar los datos")
          const data = await response.json()
          setNewRealeases(data.albums.items)
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
                <h1 className="text-2xl text-white mb-4">Nuevos Lanzamientos</h1>
                <Carrousel>
                  {newRealeases?.map(album => (
                    <SwiperSlide
                      key={album.id}
                      style={{ width: "195px" }}
                    >
                      <Cards item={album} imgClass="min-h-[190px] w-[175px] rounded-md"/>
                    </SwiperSlide>
                  ))}
                </Carrousel>
            </div>
          ) : (
            <HomeCardsSkeleton title="Nuevos Lanzamientos"/>
          )
        }
      </>
    );
}
