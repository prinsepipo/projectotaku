import { memo, useState } from "react";
import type React from "react";
import { Star, Trash2 } from "lucide-react";
import type { AnimeEntry } from "../../../types/kanban";
import ConfirmDialog from "../../common/ConfirmDialog";
import "./AnimeCard.css";

interface IProps {
  entry: AnimeEntry;
  onEpisodeChange?: (value: number) => void;
  onRemove?: () => void;
}

function progressLabel(entry: AnimeEntry): string {
  if (entry.status === "watched") return "Completed";
  if (entry.status === "watch") return "Not started";
  if (entry.currentEpisode !== undefined && entry.totalEpisodes !== undefined)
    return `Ep ${entry.currentEpisode} / ${entry.totalEpisodes}`;
  return "In progress";
}

function progressWidth(entry: AnimeEntry): number {
  if (entry.status === "watched") return 1;
  if (entry.status === "watch") return 0;
  if (entry.currentEpisode !== undefined && entry.totalEpisodes !== undefined)
    return entry.totalEpisodes > 0
      ? entry.currentEpisode / entry.totalEpisodes
      : 0;
  return 0;
}

function AnimeCard({
  entry,
  onEpisodeChange,
  onRemove,
}: IProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cardClass = "anime-card";

  const fillClass = [
    "anime-card__progress-fill",
    entry.status === "watched" ? "anime-card__progress-fill--watched" : "",
    entry.status === "watch" ? "anime-card__progress-fill--empty" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClass}>
      <img
        className="anime-card__thumb"
        src={entry.thumbnailUrl}
        alt={entry.title}
        loading="lazy"
      />

      <div className="anime-card__body">
        <p className="anime-card__title">{entry.title}</p>
        <p className="anime-card__subtitle">{entry.subtitle}</p>

        <div className="anime-card__progress">
          <div className="anime-card__progress-row">
            {entry.status === "watching" && (
              <button
                className="anime-card__ep-btn"
                aria-label="Previous episode"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onEpisodeChange?.((entry.currentEpisode ?? 0) - 1);
                }}
              >
                −
              </button>
            )}
            <span className="anime-card__progress-label">
              {progressLabel(entry)}
            </span>
            {entry.status === "watching" && (
              <button
                className="anime-card__ep-btn"
                aria-label="Next episode"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onEpisodeChange?.((entry.currentEpisode ?? 0) + 1);
                }}
              >
                +
              </button>
            )}
          </div>
          {entry.status === "watching" && entry.totalEpisodes !== undefined ? (
            <div className="anime-card__progress-slider-wrap">
              <input
                type="range"
                className="anime-card__progress-slider"
                min={1}
                max={entry.totalEpisodes}
                step={1}
                value={entry.currentEpisode ?? 0}
                onChange={(e) => onEpisodeChange?.(parseInt(e.target.value))}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                style={
                  {
                    "--fill-pct": `${progressWidth(entry) * 100}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          ) : (
            <div className="anime-card__progress-track">
              <div
                className={fillClass}
                style={{ width: `${progressWidth(entry) * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="anime-card__footer">
          {entry.genres[0] && (
            <span className="anime-card__genre">{entry.genres[0]}</span>
          )}
          <span className="anime-card__rating">
            <Star size={11} className="anime-card__rating-icon" />
            {entry.rating}
          </span>
        </div>
      </div>

      <button
        className="anime-card__action-btn"
        aria-label="Remove anime"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          setConfirmOpen(true);
        }}
      >
        <Trash2 size={11} />
      </button>

      {confirmOpen && (
        <ConfirmDialog
          title="Remove from board?"
          message={`"${entry.title}" will be removed from your watchlist.`}
          confirmLabel="Remove"
          onConfirm={() => {
            setConfirmOpen(false);
            onRemove?.();
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}

export default memo(AnimeCard);
