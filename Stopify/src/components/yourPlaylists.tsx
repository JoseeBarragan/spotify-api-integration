import { useState } from "react";
import type { Album, Playlist } from "@/types/apiTypes";

export default function Playlists ({children}: {children: React.ReactNode}) {
  const [openSide, setSide] = useState(false);
  const [open, setOpen] = useState(false)

  return (
    <div className="relative gap-2 flex w-full min-h-full">
      <aside
        className={`
          flex flex-col rounded-md py-5 overflow-hidden transition-[width] ease-in-out
          ${open ? "absolute inset-0 z-40 bg-neutral-900 duration-500" : "relative z-10 bg-neutral-600/25 duration-300"}
        `}
        style={{
          width: open
            ? "100%"  
            : openSide
            ? "32rem" 
            : "5rem" 
        }}
      >
        <div className={`flex relative z-20 ${openSide ? "justify-between" : "h-full flex-col gap-3"}`}>
          <div className="flex gap-3 items-center cursor-pointer" onClick={() => {setSide(!openSide); setOpen(false)}}>
            <button
              className={`cursor-pointer transition-all delay-100 duration-100 ease-in-out ${
                openSide ? "pl-3" : "pl-6.5"
              }`}
            >
              <svg className="size-7" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  className="text-neutral-300/95"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>
            </button>
            {openSide && (
              <h1 className="whitespace-nowrap cursor-pointer text-white transition-all duration-100 delay-75 ease-in-out font-semibold animate-[var(--animation-pop)]">
                Tu biblioteca
              </h1>
            )}
          </div>

          <div className="flex gap-3">
            <button
              className={`text-white bg-neutral-600/30 rounded-full ${
                openSide ? "px-3 py-1" : "size-8 mx-auto"
              } flex gap-1 items-center justify-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <p
                className={`transition-all duration-150 ease-in-out text-white font-semibold ${
                  openSide ? "scale-100" : "hidden opacity-0 scale-0"
                }`}
              >
                Crear
              </p>
            </button>
            {openSide && (
              <button className="mr-2 cursor-pointer" onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path
                    className="text-neutral-400/95"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </aside>
      <div className="flex-1 rounded-lg overflow-hidden">{children}</div>
    </div>
  );
}

function YourPlaylists () {
  const [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem("yourPlaylists") ?? "") as (Playlist | Album)[])
  
  return (
    <div>
    </div>
  )
}