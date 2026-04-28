import { Play, Search } from "lucide-react";
import Button from "../../common/Button";
import "./BoardEmptyState.css";

interface IProps {
  onSearchOpen: () => void;
}

function BoardEmptyState({ onSearchOpen }: IProps) {
  return (
    <div className="board-empty">
      <div className="board-empty__icon">
        <Play size={44} />
      </div>
      <h2 className="board-empty__title">
        Your board is ready — let's fill it up!
      </h2>
      <p className="board-empty__desc">
        Search for anime titles and add them to your Kanban board. Move cards
        between columns as you progress.
      </p>
      <div className="board-empty__steps">
        <div className="board-empty__step">
          <span className="board-empty__step-num">1</span>
          <span>Search anime</span>
        </div>
        <span className="board-empty__step-arrow">→</span>
        <div className="board-empty__step">
          <span className="board-empty__step-num">2</span>
          <span>Add to list</span>
        </div>
        <span className="board-empty__step-arrow">→</span>
        <div className="board-empty__step">
          <span className="board-empty__step-num">3</span>
          <span>Drag as you watch</span>
        </div>
      </div>
      <Button size="lg" icon={<Search size={16} />} onClick={onSearchOpen}>
        Search for Anime
      </Button>
    </div>
  );
}

export default BoardEmptyState;
