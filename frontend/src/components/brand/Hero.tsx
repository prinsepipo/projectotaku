import { useNavigate } from "react-router";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

import "./Hero.css";

function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="hero">
      <p className="hero-pill">⚡Powered by JikanAPI</p>
      <h1 className="hero-heading">
        Track Your <span>Anime Journey</span>, Beautifully Organized.
      </h1>
      <p className="hero-details">
        Search thousand of titles, build your watchlist, and move cards between
        columns as you progress. Your personal anime Kanban board.
      </p>
      <Button
        className="hero-button"
        onClick={() => navigate(user ? "/kanban" : "/signin")}
      >
        Get Started Now
      </Button>
      <div className="hero-preview"></div>
    </div>
  );
}

export default Hero;
