import { apiFetch, bearerHeaders } from "./authApi";

export interface AnimeSearchResult {
  malId: number;
  title: string;
  imageUrl: string;
  malUrl: string;
  totalEpisodes: number | null;
  score: number | null;
  genres: string[];
  mediaType: string | null;
}

interface JikanAnimeResponse {
  mal_id: number;
  title: string;
  image_url: string;
  mal_url: string;
  total_episodes: number | null;
  score: number | null;
  genres: string[];
  media_type: string | null;
}

export async function searchAnime(
  q: string,
  accessToken: string,
): Promise<AnimeSearchResult[]> {
  if (!q.trim()) return [];
  const items = await apiFetch<JikanAnimeResponse[]>(
    `/jikan/anime?q=${encodeURIComponent(q)}`,
    { headers: bearerHeaders(accessToken) },
  );
  return items.map((item) => ({
    malId: item.mal_id,
    title: item.title,
    imageUrl: item.image_url,
    malUrl: item.mal_url,
    totalEpisodes: item.total_episodes,
    score: item.score,
    genres: item.genres,
    mediaType: item.media_type,
  }));
}
