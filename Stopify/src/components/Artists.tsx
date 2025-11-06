import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { ArtistsResponse } from "src/interfaces/apiTypes";
import Cards from "./homeCards";
import Carrousel from "./Carrousel";

interface Props {
  artists: ArtistsResponse | undefined;
}

export default function TopArtists({ artists }: Props) {
    return (
        <div className="flex flex-col mt-4">
            <h1 className="text-2xl text-white mb-4">Top Artistas</h1>
            <Carrousel>
              {artists?.artists.map(artist => (
                <SwiperSlide
                  key={artist.id}
                  style={{ width: "195px" }}
                >
                  <Cards item={artist} imgClass="rounded-full size-[175px]" />
                </SwiperSlide>
              ))}
            </Carrousel>
        </div>
    );
}
