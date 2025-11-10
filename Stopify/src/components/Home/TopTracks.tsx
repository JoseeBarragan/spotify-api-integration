import type { PlaylistTracksResponse } from "src/interfaces/apiTypes";
import Carrousel from "../Carrousel";
import { SwiperSlide } from "swiper/react";
import HomeCards from "../homeCards";

export default function TopTracks ({topTracks}: {topTracks: PlaylistTracksResponse}) {
    const first10Tracks = topTracks.items.slice(0, 10)
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl text-white mb-4 ">Top 50</h1>
            <Carrousel>
              {first10Tracks.map(item => (
                <SwiperSlide
                  key={item.track.id}
                  style={{ width: "195px" }}
                >
                  <HomeCards item={item.track} imgClass="min-h-[190px] w-[175px] rounded-md"/>
                </SwiperSlide>
              ))}
            </Carrousel>
        </div>
    )
}