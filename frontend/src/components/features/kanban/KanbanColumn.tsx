import { memo } from "react";
import type React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus } from "lucide-react";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import AnimeCard from "./AnimeCard";
import "./KanbanColumn.css";

interface IProps {
  status: AnimeStatus;
  title: string;
  icon: React.ReactNode;
  cards: AnimeEntry[];
  isActiveTab: boolean;
  onAddClick: () => void;
  onEpisodeChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

interface SortableCardProps {
  entry: AnimeEntry;
  onEpisodeChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const SortableAnimeCard = memo(function SortableAnimeCard({
  entry,
  onEpisodeChange,
  onRemove,
}: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {isDragging ? (
        <div className="anime-card-placeholder" />
      ) : (
        <AnimeCard
          entry={entry}
          onEpisodeChange={(delta) => onEpisodeChange(entry.id, delta)}
          onRemove={() => onRemove(entry.id)}
        />
      )}
    </div>
  );
});

function KanbanColumn({
  status,
  title,
  icon,
  cards,
  isActiveTab,
  onAddClick,
  onEpisodeChange,
  onRemove,
}: IProps) {
  const { setNodeRef } = useDroppable({ id: status });

  const columnClass = [
    "kanban-column",
    `kanban-column--${status}`,
    isActiveTab ? "kanban-column--active-tab" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={columnClass}>
      <div className="kanban-column__header">
        <span className="kanban-column__icon">{icon}</span>
        <span className="kanban-column__title">{title}</span>
        <span className="kanban-column__count">{cards.length}</span>
        <button
          className="kanban-column__add"
          onClick={onAddClick}
          aria-label={`Add anime to ${title}`}
        >
          <Plus size={14} />
        </button>
      </div>

      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="kanban-column__cards" ref={setNodeRef}>
          {cards.length === 0 ? (
            <div className="kanban-column__empty">
              <p>Nothing here yet</p>
              <p>Add anime to get started</p>
            </div>
          ) : (
            cards.map((card) => (
              <SortableAnimeCard
                key={card.id}
                entry={card}
                onEpisodeChange={onEpisodeChange}
                onRemove={onRemove}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default memo(
  KanbanColumn,
  (prev, next) =>
    prev.status === next.status &&
    prev.isActiveTab === next.isActiveTab &&
    prev.onAddClick === next.onAddClick &&
    prev.onEpisodeChange === next.onEpisodeChange &&
    prev.onRemove === next.onRemove &&
    prev.cards.length === next.cards.length &&
    prev.cards.every((c, i) => c === next.cards[i]),
);
