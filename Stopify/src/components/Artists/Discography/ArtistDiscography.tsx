import type { Artist, ArtistAlbumsResponse } from "@/types/apiTypes";
import { useEffect, useRef, useState } from "react"; 
import ShowDiscography from "./ShowDiscography";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ArtistDiscography ({artist, discography}: {artist: Artist, discography: ArtistAlbumsResponse}) {
    const [open, setOpen] = useState(false)
    const [sort, setSort] = useState<{sortBy: "release" | "name", orderAsc: boolean}>({sortBy: "release", orderAsc: true})
    const [view, setView] = useState<"list" | "grid">("list")
    const ref = useRef<null | HTMLDivElement>(null)
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false)
    const [discographyType, setDiscographyType] = useState("todo")
    const typeMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      const handleClickOutside = (e: MouseEvent) => {
        if (typeMenuRef.current && !typeMenuRef.current.contains(e.target as Node)) {
          setIsTypeMenuOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("mousedown", handler)
      return () => {
        document.removeEventListener("mousedown", handler)
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [])

    const handleChangefilter = (filter: "release" | "name") => {
      setSort((prev) => {
        if(prev.sortBy === filter){
          return {...prev, orderAsc: !prev.orderAsc}
        }
        setOpen(false)
        return {sortBy: filter, orderAsc: true}
      })
    }

    return (
      <div className="py-15 px-7">
        <div className="flex justify-between">
          <h1 className="text-white text-2xl">{artist.name}</h1>
          <div ref={ref} className="relative flex gap-5 text-sm text-zinc-200">
            <div ref={typeMenuRef} className="relative inline-block">
              <button
                onClick={() => setIsTypeMenuOpen(v => !v)}
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-800"
              >
                {discographyType === "todo"
                  ? "Todo"
                  : discographyType === "album"
                  ? "Álbumes"
                  : "Sencillos y EP"}
              
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform ${
                    isTypeMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`
                  absolute left-0 mt-2 w-56
                  rounded-xl border border-zinc-800
                  bg-zinc-900/95 backdrop-blur
                  shadow-[0_8px_30px_rgba(0,0,0,0.6)]
                  transition-all duration-150 ease-out origin-top
                  ${
                    isTypeMenuOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }
                `}
              >
                <button
                  onClick={() => {
                    setDiscographyType("todo");
                    setIsTypeMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                    discographyType === "todo" ? "text-green-500" : ""
                  }`}
                >
                  <span>Todo</span>
                  {discographyType === "todo" && <span>✓</span>}
                </button>
                
                <button
                  onClick={() => {
                    setDiscographyType("album");
                    setIsTypeMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                    discographyType === "album" ? "text-green-500" : ""
                  }`}
                >
                  <span>Álbumes</span>
                  {discographyType === "album" && <span>✓</span>}
                </button>
                
                <button
                  onClick={() => {
                    setDiscographyType("sencillo");
                    setIsTypeMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                    discographyType === "sencillo" ? "text-green-500" : ""
                  }`}
                >
                  <span>Sencillos y EP</span>
                  {discographyType === "sencillo" && <span>✓</span>}
                </button>
              </div>

            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-800"
            >
              {sort.sortBy === "release" ? "Fecha de lanzamiento" : "Nombre"}
              { view === "grid" ? 
                <svg width="18" height="18" viewBox="0 0 64 64" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="6"  y="6"  width="20" height="20" rx="3" fill="currentColor"/>
                  <rect x="38" y="6"  width="20" height="20" rx="3" fill="currentColor"/>
                  <rect x="6"  y="38" width="20" height="20" rx="3" fill="currentColor"/>
                  <rect x="38" y="38" width="20" height="20" rx="3" fill="currentColor"/>
                </svg>

              : 
                <svg width="18" height="18" viewBox="0 0 64 64" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="6"  y="10" width="52" height="8" rx="3" fill="currentColor"/>
                  <rect x="6"  y="28" width="52" height="8" rx="3" fill="currentColor"/>
                  <rect x="6"  y="46" width="52" height="8" rx="3" fill="currentColor"/>
                </svg>

              }
            </button>
            <div
              className={`
                absolute left-0 mt-2 w-50
                rounded-xl border border-zinc-800
                bg-zinc-900/95 backdrop-blur
                shadow-[0_8px_30px_rgba(0,0,0,0.6)]
                transition-all duration-150 ease-out origin-top
                ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
              `}
            >
              <div className="px-3 py-2 text-xs text-zinc-500">
                Ordenar por
              </div>
              <button
                onClick={() => handleChangefilter("release")}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                  sort.sortBy === "release" ? "text-green-500" : ""
                }`}
              >
                <span>Fecha de lanzamiento</span>
                {sort.sortBy === "release" && <span className={`transition-transform text-lg ${sort.orderAsc ? "rotate-180" : ""}`}>↑</span>}
              </button>
            
              <button
                onClick={() => handleChangefilter("name")}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                  sort.sortBy === "name" ? "text-green-500" : ""
                }`}
              >
                <span>Nombre</span>
                {sort.sortBy === "name" && <span className={`transition-transform text-lg ${sort.orderAsc ? "rotate-180" : ""}`}>↑</span>}
              </button>
            
              <div className="my-2 h-px bg-zinc-800" />
            
              <div className="px-3 py-2 text-xs text-zinc-500">
                Ver como
              </div>
            
              <button
                onClick={() => setView("list")}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                  view === "list" ? "text-green-500" : ""
                }`}
              >
                <span>Lista</span>
                {view === "list" && <span>✓</span>}
              </button>
            
              <button
                onClick={() => setView("grid")}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                  view === "grid" ? "text-green-500" : ""
                }`}
              >
                <span>Cuadrícula</span>
                {view === "grid" && <span>✓</span>}
              </button>
            </div>
          </div>
        </div>
        <QueryClientProvider client={queryClient}>  
          <ShowDiscography discography={discography} filter={sort} discographyType={discographyType} type={view} />
        </QueryClientProvider>
      </div>
    )
}