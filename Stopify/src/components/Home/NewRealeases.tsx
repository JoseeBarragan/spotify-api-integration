import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Album } from "@/types/apiTypes";
import Cards from "../homeCards";
import Carrousel from "../Carrousel";
import { useEffect } from "react";

interface Props {
  newRealeases?: Album[] | undefined;
}

export default function NewReleases({ newRealeases }: Props) {

    useEffect(() => {
      const skeleton = document.getElementById("newRealeases-skeleton")
      if (skeleton) {
        skeleton.style.opacity = "0"
        skeleton.remove()
      }
    }, [])
    
    return (
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
    );
}
