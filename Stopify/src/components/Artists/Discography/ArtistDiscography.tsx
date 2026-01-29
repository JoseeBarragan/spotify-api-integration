import type { Artist, ArtistAlbumsResponse } from "@/types/apiTypes";
import { useEffect, useRef, useState } from "react"; 
import ShowDiscography from "./ShowDiscography";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ArtistDiscography ({artist, discography}: {artist: Artist, discography: ArtistAlbumsResponse}) {
    const [open, setOpen] = useState(false)
    const [sortBy, setSortBy] = useState<"release" | "name">("release")
    const [view, setView] = useState<"list" | "grid">("grid")
    const ref = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
      const handler = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handler)
      return () => document.removeEventListener("mousedown", handler)
    }, [])


    return (
      <div className="py-15 px-7">
        <div className="flex justify-between">
          <h1 className="text-white text-2xl">{artist.name}</h1>
          <div ref={ref} className="relative flex text-sm text-zinc-200">
            <select name="" id="" className="outline-none hover:bg-neutral-800 rounded-md">
              <option value="" className="hover:bg-neutral-900">Todo</option>
              <option value="" className="hover:bg-neutral-900">Albumes</option>
              <option value="" className="hover:bg-neutral-900">Sencillos y EP</option>
            </select>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-800"
            >
              {sortBy === "release" ? "Fecha de lanzamiento" : "Nombre"}
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
                absolute left-0 mt-2 w-64
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
                onClick={() => setSortBy("release")}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-800 ${
                  sortBy === "release" ? "text-green-500" : ""
                }`}
              >
                <span>Fecha de lanzamiento</span>
                {sortBy === "release" && <span>↓</span>}
              </button>
            
              <button
                onClick={() => setSortBy("name")}
                className={`w-full px-3 py-2 text-left hover:bg-zinc-800 ${
                  sortBy === "name" ? "text-green-500" : ""
                }`}
              >
                Nombre
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
          <ShowDiscography discography={discography} filter={sortBy} type={view} />
        </QueryClientProvider>
      </div>
    )
}