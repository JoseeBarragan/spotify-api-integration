// SPOTIFY BASE TYPES (Objetos comunes)


interface ExternalUrls {
  spotify: string;
}

interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

interface SimplifiedUser {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface Paging<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

// ALBUMS (Usados en /browse/new-releases o /albums/{id})

interface SimplifiedArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: { reason: string };
  type: "album";
  uri: string;
  artists: SimplifiedArtist[];
}

export interface NewReleasesResponse {
  albums: {
    href: string;
    items: Album[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}

// ARTISTS (Usados en /artists y /artists/{id})

export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface SpotifyFollowers {
  href: string | null;
  total: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
}

export interface ArtistsResponse {
  artists: Artist[];
}

// PLAYLISTS (Usados en /playlists/{id} o /me/playlists)

interface PlaylistTrackObject {
  added_at: string | null;
  added_by: SimplifiedUser | null;
  is_local: boolean;
  track: any; // Puede reemplazarse por TrackObject si se define aparte
}

export interface Playlist {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: SimplifiedUser;
  public: boolean | null;
  snapshot_id: string;
  tracks: Paging<PlaylistTrackObject>;
  type: "playlist";
  uri: string;
}
