import { useQuery } from '@tanstack/react-query';

async function fetcher(path: string) {
  const res = await fetch(`/api/spotify/${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error ${res.status}`);
  }
  return res.json();
}

export function useSpotifyQuery<T = any>(path: string, options?: { enabled?: boolean }) {
  return useQuery<T, Error>({
    queryKey: ['spotify', path],
    queryFn: () => fetcher(path),
    retry: false,
    ...options,
  });
}