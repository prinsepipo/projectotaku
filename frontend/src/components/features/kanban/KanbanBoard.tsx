import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Eye, Play, CheckCircle2 } from "lucide-react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { generateKeyBetween } from "fractional-indexing";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import { MOCK_ANIME_DATA } from "../../../data/kanbanMockData";
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
  return {
    watch: entries.filter((e) => e.status === "watch"),
    watching: entries.filter((e) => e.status === "watching"),
    watched: entries.filter((e) => e.status === "watched"),
  };
}

function KanbanBoard({ searchOpen, onSearchOpen, onSearchClose }: IProps) {
  const [columns, setColumns] = useState<Columns>(() => {
    const isNew = localStorage.getItem("isNewUser") === "true";
    return toColumns(isNew ? [] : MOCK_ANIME_DATA);
  });
  const [selectedTab, setSelectedTab] = useState<AnimeStatus>("watch");

  const savedColumnsRef = useRef<Columns | null>(null);
  const columnsRef = useRef(columns);
  columnsRef.current = columns;
  const isDraggingRef = useRef(false);

  const totalEntries =
    columns.watch.length + columns.watching.length + columns.watched.length;

  useEffect(() => {
    if (totalEntries > 0) {
      localStorage.removeItem("isNewUser");
    }
  }, [totalEntries]);

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
  }, []);

  const handleRemove = useCallback((id: string) => {
    setColumns((prev) => {
      for (const status of STATUSES) {
        const idx = prev[status].findIndex((e) => e.id === id);
        if (idx !== -1) {
          return { ...prev, [status]: prev[status].filter((e) => e.id !== id) };
        }
      }
      return prev;
    });
  }, []);

  const addedMap = useMemo(() => {
    const map = new Map<string, AnimeStatus>();
    for (const status of STATUSES) {
      for (const e of columns[status]) map.set(e.id, status);
    }
    return map;
  }, [columns]);

  function handleAddAnime(entry: AnimeEntry, status: AnimeStatus) {
    if (addedMap.has(entry.id)) return;
    setColumns((prev) => {
      const col = prev[status];
      const lastPos = col.length > 0 ? col[col.length - 1].position : null;
      const position = generateKeyBetween(lastPos, null);
      const newEntry: AnimeEntry = { ...entry, status, position };
      if (status === "watching") {
        newEntry.currentEpisode = newEntry.currentEpisode ?? 1;
      }
      return { ...prev, [status]: [...col, newEntry] };
    });
  }

  const handleDragStart = useCallback((_event: any) => {
    isDraggingRef.current = true;
    savedColumnsRef.current = columnsRef.current;
  }, []);

  const handleDragOver = useCallback((event: any) => {
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

  const handleDragEnd = useCallback((event: any) => {
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

  if (totalEntries === 0) {
    return (
      <>
        <BoardEmptyState onSearchOpen={onSearchOpen} />
        <SearchPanel
          isOpen={searchOpen}
          onClose={onSearchClose}
          addedMap={addedMap}
          onAddAnime={handleAddAnime}
        />
      </>
    );
  }

  return (
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
            entry = columnsRef.current[status].find((c) => c.id === source.id);
            if (entry) break;
          }
          return entry ? <AnimeCard entry={entry} /> : null;
        }}
      </DragOverlay>

      <SearchPanel
        isOpen={searchOpen}
        onClose={onSearchClose}
        addedMap={addedMap}
        onAddAnime={handleAddAnime}
      />
    </DragDropProvider>
  );
}

export default KanbanBoard;
