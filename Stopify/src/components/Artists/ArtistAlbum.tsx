import type { ArtistAlbumsResponse } from "@/types/apiTypes";
import { useEffect, useRef, useState } from "react";

interface Props {
  artistDiscography: ArtistAlbumsResponse;
}

type FilterDiscography = "Ultimos" | "Albums" | "Sencillos"

export default function ArtistAlbums({ artistDiscography }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterDiscography>("Ultimos")
  const [items, setItems] = useState(artistDiscography.items.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()))
  const [visibleCount, setVisibleCount] = useState(1);

  const getVisibleCount = (width: number) => {
    if (width < 500) return 2;
    if (width < 670) return 3;
    if (width < 850) return 4;
    if (width < 1020) return 5;
    if (width < 1190) return 6;
    if (width < 1365) return 7;
    return 8;
  };

  const handleFilterDiscography = (filter: FilterDiscography) => {
    setFilter(filter)
    if(filter === "Ultimos") {
      setItems(artistDiscography.items.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()))
    }
    else if (filter === "Albums") {
      setItems(artistDiscography.items.filter((i) => i.album_type === "album"))
    }
    else if (filter === "Sencillos") {
      setItems(artistDiscography.items.filter((i) => i.album_type === "single"))
    }
    else {
      setItems(artistDiscography.items.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()))
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(entries => {
      const width = entries.at(0)?.contentRect.width
      setVisibleCount(getVisibleCount(width || 1))
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, []);

  return (
    <>
      <div className="flex gap-3 w-full">
        <button 
          onClick={() => handleFilterDiscography("Ultimos")}
          className={`cursor-pointer text-sm px-4 py-2 rounded-full transition-colors ease-in-out duration-150 ${filter === "Ultimos" ? "bg-white hover:bg-neutral-200" : "bg-neutral-700 text-white hover:bg-neutral-600 "}`}>
            Últimos Lanzamientos
        </button>
        <button 
          onClick={() => handleFilterDiscography("Albums")}
         className={`cursor-pointer text-sm px-4 py-2 rounded-full transition-colors ease-in-out duration-150 ${filter === "Albums" ? "bg-white hover:bg-neutral-200" : "bg-neutral-700 text-white hover:bg-neutral-600 "}`}>
            Álbumes
        </button>
        <button 
          onClick={() => handleFilterDiscography("Sencillos")}
         className={`cursor-pointer text-sm px-4 py-2 rounded-full transition-colors ease-in-out duration-150 ${filter === "Sencillos" ? "bg-white hover:bg-neutral-200" : "bg-neutral-700 text-white hover:bg-neutral-600 "}`}>
            Sencillos y EP
        </button>
      </div>
      <div ref={containerRef} className="flex overflow-hidden w-full gap-3">
        {
          items.length !== 0 ? (
            items.slice(0, visibleCount).map((item, idx) => (
              <div
                  key={item.id}
                  ref={idx === 0 ? itemRef : null}
                  className="flex-1 min-w-40 w-[clamp(160px,195px,220px)] h-full p-2.5 cursor-pointer hover:bg-neutral-800 transition-colors duration-75 ease-linear rounded-md shrink-0"
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
            ))
          ) : (
            <p className="text-white py-4 px-2">No hay novedades sobre este artista en este campo</p>
          )
        }
      </div>
    </>
  );
}
