import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Album } from "src/interfaces/apiTypes";
import Cards from "./homeCards";
import { useState } from "react";

interface Props {
  newRealeases?: Album[] | undefined;
}

export default function NewReleases({ newRealeases }: Props) {
    const [canSlidePrev, setCanSlidePrev] = useState(false);
    const [canSlideNext, setCanSlideNext] = useState(false);
    return (
        <div className="flex flex-col pl-11 py-6">
            <h1 className="text-2xl text-white mb-4">Nuevos Lanzamientos</h1>

            <div className="relative group">
                {canSlidePrev && (
                  <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black/30 via-black/5 to-transparent z-20 transition-opacity duration-300 pointer-events-none" />
                )}
                {canSlideNext && (
                  <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black/30 via-black/5 to-transparent z-20 transition-opacity duration-300 pointer-events-none" />
                )}
                <button
                  disabled={!canSlidePrev}
                  className={
                    `absolute size-8 cursor-pointer opacity-0 transition-all duration-150 
                    ease-in-out left-0 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white rounded-full hover:bg-black/70
                    ${canSlidePrev ? "group-hover:opacity-100": ""}
                    `
                  }
                  id="prevButton"
                >
                  &#10094;
                </button>
                <button
                  disabled={!canSlideNext}
                  className={`
                    absolute size-10 cursor-pointer opacity-0 transition-all duration-150 ease-in-out right-0 
                    top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white rounded-full hover:bg-black/70
                    ${canSlideNext ? "group-hover:opacity-100": ""}
                    `
                }
                  id="nextButton"
                >
                  &#10095;
                </button>

                 <Swiper
                    modules={[Navigation]}
                    spaceBetween={16} 
                    slidesPerView="auto"
                    navigation={{
                      prevEl: "#prevButton",
                      nextEl: "#nextButton",
                    }}
                    onSlideChange={(swiper) => {
                      setCanSlidePrev(swiper.isBeginning === false);
                      setCanSlideNext(swiper.isEnd === false);
                    }}
                    onInit={(swiper) => {
                      setCanSlidePrev(swiper.isBeginning === false);
                      setCanSlideNext(swiper.isEnd === false);
                    }}
                >
                  {newRealeases?.map(album => (
                    <SwiperSlide
                      key={album.id}
                      style={{ width: "220px" }}
                    >
                      <Cards album={album} />
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
        </div>
    );
}
