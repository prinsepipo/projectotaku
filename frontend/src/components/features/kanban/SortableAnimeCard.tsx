import { useSortable } from "@dnd-kit/react/sortable";
import type { AnimeEntry, AnimeStatus } from "../../../types/kanban";
import AnimeCard from "./AnimeCard";
import DropPlaceholder from "./DropPlaceholder";

interface IProps {
  entry: AnimeEntry;
  index: number;
  column: AnimeStatus;
  onEpisodeChange: (value: number) => void;
  onRemove: () => void;
}

function SortableAnimeCard({
  entry,
  index,
  column,
  onEpisodeChange,
  onRemove,
}: IProps) {
  const { ref, isDragging } = useSortable({
    id: entry.id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <div ref={ref} className="sortable-wrapper">
      {isDragging ? (
        <DropPlaceholder />
      ) : (
        <AnimeCard
          entry={entry}
          onEpisodeChange={onEpisodeChange}
          onRemove={onRemove}
        />
      )}
    </div>
  );
}

export default SortableAnimeCard;
