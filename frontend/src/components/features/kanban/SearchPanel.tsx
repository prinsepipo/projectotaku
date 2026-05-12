import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import type { AnimeStatus } from "../../../types/kanban";
import type { AnimeSearchResult } from "../../../api/jikanApi";
import { searchAnime } from "../../../api/jikanApi";
import { useAuth } from "../../../hooks/useAuth";
import "./SearchPanel.css";

const STATUS_LABEL: Record<AnimeStatus, string> = {
  watch: "Watch",
  watching: "Watching",
  watched: "Watched",
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  addedMap: Map<number, AnimeStatus>;
  onAddAnime: (result: AnimeSearchResult, status: AnimeStatus) => void;
}

function SearchPanel({ isOpen, onClose, addedMap, onAddAnime }: IProps) {
  const { accessToken } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setQuery("");
        setResults([]);
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

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || !accessToken) {
      return;
    }

    const timerId = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(false);
      try {
        const data = await searchAnime(trimmed, accessToken);
        setResults(data);
      } catch {
        setSearchError(true);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timerId);
      setIsSearching(false);
    };
  }, [query, accessToken]);

  if (!isOpen) return null;

  const activeQuery = query.trim() && accessToken;
  const displayResults = activeQuery ? results : [];
  const displaySearchError = activeQuery ? searchError : false;

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
          {isSearching ? (
            <div className="search-panel__loading">
              <Loader2 size={16} className="search-panel__spinner" />
              Searching…
            </div>
          ) : displaySearchError ? (
            <div className="search-panel__empty">
              <p>Search unavailable</p>
              <p>Please try again later</p>
            </div>
          ) : !query.trim() ? (
            <div className="search-panel__empty">
              <p>Type to search anime</p>
            </div>
          ) : displayResults.length === 0 ? (
            <div className="search-panel__empty">
              <p>No results for &ldquo;{query}&rdquo;</p>
              <p>Try a different title</p>
            </div>
          ) : (
            displayResults.map((result) => {
              const addedStatus = addedMap.get(result.malId);
              const added = addedStatus !== undefined;
              return (
                <div key={result.malId} className="search-panel__result-item">
                  <img
                    className="search-panel__result-thumb"
                    src={result.imageUrl}
                    alt={result.title}
                    loading="lazy"
                  />
                  <div className="search-panel__result-info">
                    <p className="search-panel__result-title">{result.title}</p>
                    <p className="search-panel__result-meta">
                      {[
                        result.mediaType,
                        result.totalEpisodes
                          ? `${result.totalEpisodes} eps`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {!added && (
                      <div className="search-panel__col-picker">
                        <span className="search-panel__col-picker-label">
                          Add to:
                        </span>
                        {(
                          ["watch", "watching", "watched"] as AnimeStatus[]
                        ).map((status) => (
                          <button
                            key={status}
                            className={`search-panel__col-btn search-panel__col-btn--${status}`}
                            onClick={() => onAddAnime(result, status)}
                          >
                            {STATUS_LABEL[status]}
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
