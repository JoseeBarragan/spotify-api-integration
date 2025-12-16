import type { ArtistAlbumsResponse } from "@/types/apiTypes";
import { useEffect, useRef, useState } from "react";

interface Props {
  artistDiscography: ArtistAlbumsResponse;
}

export default function ArtistAlbums({ artistDiscography }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function updateCount() {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const itemWidth = itemRef.current?.offsetWidth ?? 0;

      if (containerWidth === 0 || itemWidth === 0) return;

      const count = Math.max(1, Math.floor(containerWidth / itemWidth));
      setVisibleCount(count);
    }
    
    setTimeout(updateCount, 0);
    setTimeout(updateCount, 100);

    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const visibleItems = artistDiscography.items.slice(0, visibleCount);

  return (
    <div ref={containerRef} className="flex flex-nowrap overflow-hidden w-full gap-3">
      {visibleItems.map((item, idx) => (
        <div
            key={item.id}
            ref={idx === 0 ? itemRef : null}
            className="max-w-[195px] h-full p-2.5 cursor-pointer hover:bg-neutral-800 transition-colors duration-75 ease-linear rounded-md flex-shrink-0 w-full"
        >
            <img
                src={item.images.at(1)?.url ?? ""}
                alt={item.name}
                width={192}
                height={192}
                className="rounded-md shadow-xl object-cover w-full h-auto"
            />
            <h1 className="text-neutral-100">{item.name}</h1>
            <p className="flex items-center gap-1 text-neutral-500 capitalize">{item.album_type} <span className="size-1 bg-neutral-400 inline-block rounded-full"></span> {item.release_date.split("", 4)}</p>
        </div>
      ))}
    </div>
  );
}
