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

interface PlaylistTrackObject {
  added_at: string | null;    
  added_by: SimplifiedUser | null;
  is_local: boolean;
  track: any;                 
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
  restrictions?: {
    reason: string;
  };
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