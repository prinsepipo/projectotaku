import { useState, useEffect, useMemo, useCallback } from "react";
import { Eye, Play, CheckCircle2 } from "lucide-react";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import { MOCK_ANIME_DATA } from "../../../data/kanbanMockData";
import KanbanColumn from "./KanbanColumn";
import SearchPanel from "./SearchPanel";
import BoardEmptyState from "./BoardEmptyState";
import "./KanbanBoard.css";

interface IProps {
  searchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

type Columns = Record<AnimeStatus, AnimeEntry[]>;

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

  const totalEntries =
    columns.watch.length + columns.watching.length + columns.watched.length;

  useEffect(() => {
    if (totalEntries > 0) {
      localStorage.removeItem("isNewUser");
    }
  }, [totalEntries]);

  const handleEpisodeChange = useCallback((id: string, value: number) => {
    setColumns((prev) => {
      for (const status of ["watch", "watching", "watched"] as AnimeStatus[]) {
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
      for (const status of ["watch", "watching", "watched"] as AnimeStatus[]) {
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
    for (const status of ["watch", "watching", "watched"] as AnimeStatus[]) {
      for (const e of columns[status]) map.set(e.id, status);
    }
    return map;
  }, [columns]);

  function handleAddAnime(entry: AnimeEntry, status: AnimeStatus) {
    if (addedMap.has(entry.id)) return;
    const newEntry: AnimeEntry = { ...entry, status };
    if (status === "watching") {
      newEntry.currentEpisode = newEntry.currentEpisode ?? 1;
    }
    setColumns((prev) => ({ ...prev, [status]: [...prev[status], newEntry] }));
  }

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
    <>
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

      <SearchPanel
        isOpen={searchOpen}
        onClose={onSearchClose}
        addedMap={addedMap}
        onAddAnime={handleAddAnime}
      />
    </>
  );
}

export default KanbanBoard;
