import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { ArtistsResponse } from "@/types/apiTypes";
import Cards from "../homeCards";
import Carrousel from "../Carrousel";
import { useEffect } from "react";

interface Props {
  artists: ArtistsResponse | undefined;
}

export default function TopArtists({ artists }: Props) {

    useEffect(() => {
      const skeleton = document.getElementById("topArtists-skeleton")
      if (skeleton) {
        skeleton.style.opacity = "0"
        skeleton.remove()
      }
    }, [])

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl text-white mb-4">Top Artistas</h1>
              <Carrousel>
                {artists?.artists?.map(artist => (
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
    );
}
