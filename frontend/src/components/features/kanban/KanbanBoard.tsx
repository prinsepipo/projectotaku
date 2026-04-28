import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Eye, Play, CheckCircle2 } from "lucide-react";
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

const COLUMNS: { status: AnimeStatus; title: string; icon: React.ReactNode }[] =
  [
    { status: "watch", title: "Watch", icon: <Eye size={16} /> },
    { status: "watching", title: "Watching", icon: <Play size={16} /> },
    { status: "watched", title: "Watched", icon: <CheckCircle2 size={16} /> },
  ];

function KanbanBoard({ searchOpen, onSearchOpen, onSearchClose }: IProps) {
  const [entries, setEntries] = useState<AnimeEntry[]>(() => {
    const isNew = localStorage.getItem("isNewUser") === "true";
    return isNew ? [] : MOCK_ANIME_DATA;
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<AnimeStatus>("watch");
  const entriesSnapshot = useRef<AnimeEntry[]>([]);
  // Tracks the column the dragged card is currently committed to, preventing
  // oscillation when layout shifts cause handleDragOver to fire for the wrong column.
  const activeDragColumnRef = useRef<AnimeStatus | null>(null);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.removeItem("isNewUser");
    }
  }, [entries.length]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const activeEntry = activeId
    ? entries.find((e) => e.id === activeId)
    : undefined;

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    setActiveId(id);
    entriesSnapshot.current = entries;
    activeDragColumnRef.current =
      entries.find((e) => e.id === id)?.status ?? null;
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    const columnStatuses: AnimeStatus[] = ["watch", "watching", "watched"];
    const isOverColumn = columnStatuses.includes(overIdStr as AnimeStatus);

    // Resolve the target column from either the column droppable id or the hovered card's status.
    // Use the closure `entries` (not `prev`) so we can read this before calling setEntries.
    const targetStatus: AnimeStatus = isOverColumn
      ? (overIdStr as AnimeStatus)
      : (entries.find((e) => e.id === overIdStr)?.status ??
        activeDragColumnRef.current!);

    // Gate on the committed column ref — one state update per column crossing.
    // Without this gate, layout shifts after each update fire handleDragOver again
    // for the previous column, causing an infinite setState loop.
    if (activeDragColumnRef.current === targetStatus) return;
    activeDragColumnRef.current = targetStatus;

    setEntries((prev) => {
      const activeEntry = prev.find((e) => e.id === activeIdStr);
      if (!activeEntry) return prev;
      if (activeEntry.status === targetStatus) return prev;
      return prev.map((e) =>
        e.id === activeIdStr ? { ...e, status: targetStatus } : e,
      );
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    activeDragColumnRef.current = null;
    setActiveId(null);
    const { active, over } = event;

    if (!over) {
      setEntries(entriesSnapshot.current);
      return;
    }

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);
    if (activeIdStr === overIdStr) return;

    const columnStatuses: AnimeStatus[] = ["watch", "watching", "watched"];
    if (columnStatuses.includes(overIdStr as AnimeStatus)) return;

    // Reorder within the current column (handles both same-column moves and
    // the final position after a cross-column drop onto a card).
    setEntries((prev) => {
      const activeEntry = prev.find((e) => e.id === activeIdStr);
      const overEntry = prev.find((e) => e.id === overIdStr);
      if (!activeEntry || !overEntry) return prev;
      if (activeEntry.status !== overEntry.status) return prev;

      const col = prev.filter((e) => e.status === activeEntry.status);
      const oldIdx = col.findIndex((e) => e.id === activeIdStr);
      const newIdx = col.findIndex((e) => e.id === overIdStr);
      if (oldIdx === newIdx) return prev;
      const reordered = arrayMove(col, oldIdx, newIdx);
      return [
        ...prev.filter((e) => e.status !== activeEntry.status),
        ...reordered,
      ];
    });
  }

  function handleDragCancel() {
    activeDragColumnRef.current = null;
    setEntries(entriesSnapshot.current);
    setActiveId(null);
  }

  const handleEpisodeChange = useCallback((id: string, value: number) => {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id !== id || e.totalEpisodes === undefined) return e;
        const clamped = Math.max(1, Math.min(value, e.totalEpisodes));
        return { ...e, currentEpisode: clamped };
      }),
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  function handleAddAnime(entry: AnimeEntry, status: AnimeStatus) {
    const alreadyAdded = entries.some((e) => e.id === entry.id);
    if (alreadyAdded) return;
    const newEntry: AnimeEntry = { ...entry, status };
    if (status === "watching") {
      newEntry.currentEpisode = newEntry.currentEpisode ?? 1;
    }
    setEntries((prev) => [...prev, newEntry]);
  }

  const addedMap = useMemo(
    () => new Map(entries.map((e) => [e.id, e.status])),
    [entries],
  );

  if (entries.length === 0) {
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
              {entries.filter((e) => e.status === col.status).length}
            </span>
          </button>
        ))}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="kanban-board">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              icon={col.icon}
              cards={entries.filter((e) => e.status === col.status)}
              isActiveTab={selectedTab === col.status}
              onAddClick={onSearchOpen}
              onEpisodeChange={handleEpisodeChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <DragOverlay>
          {activeEntry ? (
            <AnimeCard entry={activeEntry} isDragging={false} />
          ) : null}
        </DragOverlay>
      </DndContext>

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
