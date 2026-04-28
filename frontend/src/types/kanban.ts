export type AnimeStatus = "watch" | "watching" | "watched";

export interface AnimeEntry {
  id: string;
  title: string;
  subtitle: string;
  genres: string[];
  rating: string;
  thumbnailUrl: string;
  status: AnimeStatus;
  currentEpisode?: number;
  totalEpisodes?: number;
}
