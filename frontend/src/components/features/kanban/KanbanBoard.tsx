import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Eye, Play, CheckCircle2 } from "lucide-react";
import {
  DragDropProvider,
  DragOverlay,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { generateKeyBetween } from "fractional-indexing";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import type { AnimeSearchResult } from "../../../api/jikanApi";
import {
  getWatchlist,
  addItem,
  updateItem,
  deleteItem,
} from "../../../api/watchlistApi";
import type { WatchlistItemPayload } from "../../../api/watchlistApi";
import { useAuth } from "../../../hooks/useAuth";
import KanbanColumn from "./KanbanColumn";
import AnimeCard from "./AnimeCard";
import SearchPanel from "./SearchPanel";
import BoardEmptyState from "./BoardEmptyState";
import "./KanbanBoard.css";

interface IProps {
  searchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

type Columns = Record<AnimeStatus, AnimeEntry[]>;

const STATUSES: AnimeStatus[] = ["watch", "watching", "watched"];

const COLUMNS: { status: AnimeStatus; title: string; icon: React.ReactNode }[] =
  [
    { status: "watch", title: "Watch", icon: <Eye size={16} /> },
    { status: "watching", title: "Watching", icon: <Play size={16} /> },
    { status: "watched", title: "Watched", icon: <CheckCircle2 size={16} /> },
  ];

function toColumns(entries: AnimeEntry[]): Columns {
  const sorted = [...entries].sort((a, b) =>
    a.position < b.position ? -1 : 1,
  );
  return {
    watch: sorted.filter((e) => e.status === "watch"),
    watching: sorted.filter((e) => e.status === "watching"),
    watched: sorted.filter((e) => e.status === "watched"),
  };
}

function KanbanBoard({ searchOpen, onSearchOpen, onSearchClose }: IProps) {
  const { accessToken } = useAuth();
  const [columns, setColumns] = useState<Columns>({
    watch: [],
    watching: [],
    watched: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [boardError, setBoardError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<AnimeStatus>("watch");

  const accessTokenRef = useRef<string | null>(null);
  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  const savedColumnsRef = useRef<Columns | null>(null);
  const columnsRef = useRef(columns);
  useEffect(() => {
    columnsRef.current = columns;
  });
  const isDraggingRef = useRef(false);
  const episodeDebounceRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    if (!accessToken) return;
    getWatchlist(accessToken)
      .then((items) => {
        setColumns(toColumns(items));
        setBoardError(null);
        setIsLoading(false);
      })
      .catch(() => {
        setBoardError("Failed to load your watchlist. Please reload the page.");
        setIsLoading(false);
      });
  }, [accessToken]);

  const totalEntries =
    columns.watch.length + columns.watching.length + columns.watched.length;

  const addedMap = useMemo(() => {
    const map = new Map<number, AnimeStatus>();
    for (const status of STATUSES) {
      for (const e of columns[status]) map.set(e.malId, status);
    }
    return map;
  }, [columns]);

  const handleEpisodeChange = useCallback((id: string, value: number) => {
    setColumns((prev) => {
      for (const status of STATUSES) {
        const idx = prev[status].findIndex((e) => e.id === id);
        if (idx !== -1) {
          const entry = prev[status][idx];
          if (entry.totalEpisodes === undefined) return prev;
          const clamped = Math.max(1, Math.min(value, entry.totalEpisodes));
          if (clamped === entry.currentEpisode) return prev;
          return {
            ...prev,
            [status]: prev[status].map((e, i) =>
              i === idx ? { ...e, currentEpisode: clamped } : e,
            ),
          };
        }
      }
      return prev;
    });

    const existing = episodeDebounceRef.current.get(id);
    if (existing) clearTimeout(existing);
    episodeDebounceRef.current.set(
      id,
      setTimeout(() => {
        episodeDebounceRef.current.delete(id);
        if (accessTokenRef.current) {
          updateItem(
            id,
            { currentEpisode: value },
            accessTokenRef.current,
          ).catch(() => {});
        }
      }, 300),
    );
  }, []);

  const handleRemove = useCallback(async (id: string) => {
    if (!accessTokenRef.current) return;
    try {
      await deleteItem(id, accessTokenRef.current);
      setColumns((prev) => {
        for (const status of STATUSES) {
          if (prev[status].some((e) => e.id === id)) {
            return {
              ...prev,
              [status]: prev[status].filter((e) => e.id !== id),
            };
          }
        }
        return prev;
      });
    } catch {
      // pessimistic: card stays if delete fails
    }
  }, []);

  async function handleAddAnime(
    result: AnimeSearchResult,
    status: AnimeStatus,
  ) {
    if (!accessTokenRef.current) return;
    if (addedMap.has(result.malId)) return;

    const col = columnsRef.current[status];
    const lastPos = col.length > 0 ? col[col.length - 1].position : null;
    const position = generateKeyBetween(lastPos, null);

    const payload: WatchlistItemPayload = {
      malId: result.malId,
      title: result.title,
      imageUrl: result.imageUrl,
      malUrl: result.malUrl,
      status,
      position,
      totalEpisodes: result.totalEpisodes ?? undefined,
      score: result.score ?? undefined,
      genres: result.genres.length > 0 ? result.genres.join(",") : undefined,
      mediaType: result.mediaType ?? undefined,
      ...(status === "watching" ? { currentEpisode: 1 } : {}),
    };

    try {
      const newEntry = await addItem(payload, accessTokenRef.current);
      setColumns((prev) => ({
        ...prev,
        [status]: [...prev[status], newEntry],
      }));
    } catch {
      // pessimistic: do nothing if add fails
    }
  }

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    savedColumnsRef.current = columnsRef.current;
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const sourceId = event.operation?.source?.id as string | undefined;
    const targetId = event.operation?.target?.id as string | undefined;

    // Hovering over own placeholder: mutate() in @dnd-kit/helpers would enter its
    // stale-index reconciliation path and move the card to the wrong position.
    if (!targetId || targetId === sourceId) return;

    if (targetId && STATUSES.includes(targetId as AnimeStatus)) {
      // Hovering over a column droppable (empty space), not a sortable card.
      // move() would incorrectly insert at index 0 here, so we handle it manually.
      if (!sourceId) return;

      setColumns((prev) => {
        let sourceEntry: AnimeEntry | undefined;
        let sourceStatus: AnimeStatus | undefined;
        for (const status of STATUSES) {
          const found = prev[status].find((c) => c.id === sourceId);
          if (found) {
            sourceEntry = found;
            sourceStatus = status;
            break;
          }
        }
        if (!sourceEntry || !sourceStatus) return prev;

        const targetStatus = targetId as AnimeStatus;

        if (sourceStatus === targetStatus) {
          const col = prev[sourceStatus];
          // Card is already at the end — no change needed
          if (col[col.length - 1]?.id === sourceId) return prev;
          const withoutSource = col.filter((c) => c.id !== sourceId);
          return { ...prev, [sourceStatus]: [...withoutSource, sourceEntry] };
        }

        return {
          ...prev,
          [sourceStatus]: prev[sourceStatus].filter((c) => c.id !== sourceId),
          [targetStatus]: [...prev[targetStatus], sourceEntry],
        };
      });
      return;
    }

    setColumns((prev) => move(prev, event) as Columns);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    isDraggingRef.current = false;

    if (event.canceled) {
      if (savedColumnsRef.current) {
        setColumns(savedColumnsRef.current);
      }
      savedColumnsRef.current = null;
      return;
    }

    savedColumnsRef.current = null;

    const movedId = event.operation.source?.id as string | undefined;
    if (!movedId) return;

    setColumns((prev) => {
      for (const status of STATUSES) {
        const idx = prev[status].findIndex((c) => c.id === movedId);
        if (idx === -1) continue;

        const prevPos = prev[status][idx - 1]?.position ?? null;
        const nextPos = prev[status][idx + 1]?.position ?? null;
        const newPosition = generateKeyBetween(prevPos, nextPos);

        if (accessTokenRef.current) {
          updateItem(
            movedId,
            { status, position: newPosition },
            accessTokenRef.current,
          ).catch(() => {});
        }

        return {
          ...prev,
          [status]: prev[status].map((c, i) =>
            i === idx ? { ...c, status, position: newPosition } : c,
          ),
        };
      }
      return prev;
    });
  }, []);

  if (isLoading) {
    return <div className="kanban-board-loading">Loading your watchlist…</div>;
  }

  if (boardError) {
    return <div className="kanban-board-error">{boardError}</div>;
  }

  const searchPanel = (
    <SearchPanel
      isOpen={searchOpen}
      onClose={onSearchClose}
      addedMap={addedMap}
      onAddAnime={handleAddAnime}
    />
  );

  if (totalEntries === 0) {
    return (
      <>
        <BoardEmptyState onSearchOpen={onSearchOpen} />
        {searchPanel}
      </>
    );
  }

  return (
    <>
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-tab-bar">
          {COLUMNS.map((col) => (
            <button
              key={col.status}
              className={[
                "kanban-tab-bar__tab",
                selectedTab === col.status
                  ? `kanban-tab-bar__tab--active-${col.status}`
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSelectedTab(col.status)}
            >
              {col.title}
              <span className="kanban-tab-bar__count">
                {columns[col.status].length}
              </span>
            </button>
          ))}
        </div>

        <div className="kanban-board">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              icon={col.icon}
              cards={columns[col.status]}
              isActiveTab={selectedTab === col.status}
              onAddClick={onSearchOpen}
              onEpisodeChange={handleEpisodeChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <DragOverlay>
          {(source) => {
            if (!isDraggingRef.current) return null;
            let entry: AnimeEntry | undefined;
            for (const status of STATUSES) {
              entry = columnsRef.current[status].find(
                (c) => c.id === source.id,
              );
              if (entry) break;
            }
            return entry ? <AnimeCard entry={entry} /> : null;
          }}
        </DragOverlay>
      </DragDropProvider>

      {searchPanel}
    </>
  );
}

export default KanbanBoard;
