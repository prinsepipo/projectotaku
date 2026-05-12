export type AnimeStatus = "watch" | "watching" | "watched";

export interface AnimeEntry {
  id: string;
  malId: number;
  malUrl: string;
  title: string;
  imageUrl: string;
  subtitle: string;
  genres: string[];
  score: number | null;
  status: AnimeStatus;
  position: string;
  currentEpisode?: number;
  totalEpisodes?: number;
  mediaType?: string;
}
