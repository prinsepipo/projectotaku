import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import { SEARCH_POOL } from "../../../data/kanbanMockData";
import "./SearchPanel.css";

const STATUS_LABEL: Record<AnimeStatus, string> = {
  watch: "Watch",
  watching: "Watching",
  watched: "Watched",
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  addedMap: Map<string, AnimeStatus>;
  onAddAnime: (entry: AnimeEntry, status: AnimeStatus) => void;
}

function SearchPanel({ isOpen, onClose, addedMap, onAddAnime }: IProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? SEARCH_POOL.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase()),
      )
    : SEARCH_POOL;

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="search-panel-backdrop" onClick={handleBackdropClick}>
      <div className="search-panel" role="dialog" aria-label="Search anime">
        <div className="search-panel__input-row">
          <Search size={16} className="search-panel__icon" />
          <input
            ref={inputRef}
            className="search-panel__input"
            type="text"
            placeholder="Search anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="search-panel__esc">Esc</span>
          {query && (
            <button
              className="search-panel__clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="search-panel__results">
          {query.trim() && results.length === 0 ? (
            <div className="search-panel__empty">
              <p>No results for &ldquo;{query}&rdquo;</p>
              <p>Try a different title</p>
            </div>
          ) : (
            results.map((entry) => {
              const addedStatus = addedMap.get(entry.id);
              const added = addedStatus !== undefined;
              return (
                <div key={entry.id} className="search-panel__result-item">
                  <img
                    className="search-panel__result-thumb"
                    src={entry.thumbnailUrl}
                    alt={entry.title}
                    loading="lazy"
                  />
                  <div className="search-panel__result-info">
                    <p className="search-panel__result-title">{entry.title}</p>
                    <p className="search-panel__result-meta">
                      {entry.subtitle}
                    </p>
                    {!added && (
                      <div className="search-panel__col-picker">
                        <span className="search-panel__col-picker-label">
                          Add to:
                        </span>
                        {(
                          [
                            { status: "watch" as AnimeStatus, label: "Watch" },
                            {
                              status: "watching" as AnimeStatus,
                              label: "Watching",
                            },
                            {
                              status: "watched" as AnimeStatus,
                              label: "Watched",
                            },
                          ] as const
                        ).map(({ status, label }) => (
                          <button
                            key={status}
                            className={`search-panel__col-btn search-panel__col-btn--${status}`}
                            onClick={() => onAddAnime(entry, status)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {added && addedStatus && (
                    <span
                      className={`search-panel__col-btn search-panel__col-btn--${addedStatus} search-panel__col-btn--static`}
                      aria-label={`In ${STATUS_LABEL[addedStatus]}`}
                    >
                      {STATUS_LABEL[addedStatus]}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="search-panel__footer">Powered by Jikan API</div>
      </div>
    </div>
  );
}

export default SearchPanel;
