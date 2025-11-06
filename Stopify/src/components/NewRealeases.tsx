import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Album } from "src/interfaces/apiTypes";
import Cards from "./homeCards";
import Carrousel from "./Carrousel";

interface Props {
  newRealeases?: Album[] | undefined;
}

export default function NewReleases({ newRealeases }: Props) {
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
