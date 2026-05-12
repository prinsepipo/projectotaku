import type { AnimeEntry, AnimeStatus } from "../types/kanban";
import { apiFetch, bearerHeaders, jsonBearerHeaders } from "./authApi";

interface WatchlistItemResponse {
  id: number;
  mal_id: number;
  title: string;
  image_url: string;
  mal_url: string;
  status: AnimeStatus;
  position: string;
  total_episodes: number | null;
  current_episode: number | null;
  score: number | null;
  genres: string[];
  media_type: string | null;
  added_at: string;
}

export interface WatchlistItemPayload {
  malId: number;
  title: string;
  imageUrl: string;
  malUrl: string;
  status: AnimeStatus;
  position: string;
  totalEpisodes?: number;
  currentEpisode?: number;
  score?: number;
  genres?: string;
  mediaType?: string;
}

export interface WatchlistItemPatch {
  status?: AnimeStatus;
  position?: string;
  currentEpisode?: number;
}

function buildSubtitle(
  mediaType: string | null,
  totalEpisodes: number | null,
): string {
  return [mediaType, totalEpisodes ? `${totalEpisodes} eps` : null]
    .filter(Boolean)
    .join(" · ");
}

function mapToAnimeEntry(item: WatchlistItemResponse): AnimeEntry {
  return {
    id: String(item.id),
    malId: item.mal_id,
    malUrl: item.mal_url,
    title: item.title,
    imageUrl: item.image_url,
    subtitle: buildSubtitle(item.media_type, item.total_episodes),
    genres: item.genres,
    score: item.score,
    status: item.status,
    position: item.position,
    currentEpisode: item.current_episode ?? undefined,
    totalEpisodes: item.total_episodes ?? undefined,
    mediaType: item.media_type ?? undefined,
  };
}

export async function getWatchlist(accessToken: string): Promise<AnimeEntry[]> {
  const items = await apiFetch<WatchlistItemResponse[]>("/watchlist", {
    headers: bearerHeaders(accessToken),
  });
  return items.map(mapToAnimeEntry);
}

export async function addItem(
  payload: WatchlistItemPayload,
  accessToken: string,
): Promise<AnimeEntry> {
  const item = await apiFetch<WatchlistItemResponse>("/watchlist", {
    method: "POST",
    headers: jsonBearerHeaders(accessToken),
    body: JSON.stringify({
      mal_id: payload.malId,
      title: payload.title,
      image_url: payload.imageUrl,
      mal_url: payload.malUrl,
      status: payload.status,
      position: payload.position,
      total_episodes: payload.totalEpisodes ?? null,
      current_episode: payload.currentEpisode ?? null,
      score: payload.score ?? null,
      genres: payload.genres ?? null,
      media_type: payload.mediaType ?? null,
    }),
  });
  return mapToAnimeEntry(item);
}

export async function updateItem(
  id: string,
  patch: WatchlistItemPatch,
  accessToken: string,
): Promise<AnimeEntry> {
  const item = await apiFetch<WatchlistItemResponse>(`/watchlist/${id}`, {
    method: "PATCH",
    headers: jsonBearerHeaders(accessToken),
    body: JSON.stringify({
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.position !== undefined ? { position: patch.position } : {}),
      ...(patch.currentEpisode !== undefined
        ? { current_episode: patch.currentEpisode }
        : {}),
    }),
  });
  return mapToAnimeEntry(item);
}

export async function deleteItem(
  id: string,
  accessToken: string,
): Promise<void> {
  await apiFetch<void>(`/watchlist/${id}`, {
    method: "DELETE",
    headers: bearerHeaders(accessToken),
  });
}
