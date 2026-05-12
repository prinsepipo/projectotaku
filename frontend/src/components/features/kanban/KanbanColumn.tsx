import { memo } from "react";
import type React from "react";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/react";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import SortableAnimeCard from "./SortableAnimeCard";
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
  const { ref: droppableRef } = useDroppable({
    id: status,
    data: { group: status },
  });

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

      <div className="kanban-column__cards" ref={droppableRef}>
        {cards.length === 0 ? (
          <div className="kanban-column__empty">
            <p>Nothing here yet</p>
            <p>Add anime to get started</p>
          </div>
        ) : (
          cards.map((card, index) => (
            <SortableAnimeCard
              key={card.id}
              entry={card}
              index={index}
              column={status}
              onEpisodeChange={(value) => onEpisodeChange(card.id, value)}
              onRemove={() => onRemove(card.id)}
            />
          ))
        )}
      </div>
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
