export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_data_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
export interface TracksResponse {
  href: string;
  limit: number;
  offset: number;
  previous: string;
  total: number;
  items: Track[];
}

export interface ArtistsResponse {
  href: string;
  items: Artist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface AlbumsResponse {
  href: string;
  items: Album[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface SearchResponse {
  albums: AlbumsResponse;
  artists: ArtistsResponse;
  tracks: TracksResponse;
}
