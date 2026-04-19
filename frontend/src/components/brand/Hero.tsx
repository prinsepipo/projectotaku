import Button from "../common/Button";

import "./Hero.css";

function Hero() {
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
      <Button className="hero-button">Get Started Now</Button>
      <div className="hero-preview"></div>
    </div>
  );
}

export default Hero;
