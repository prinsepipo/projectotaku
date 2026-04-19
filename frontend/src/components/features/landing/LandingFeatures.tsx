import { BadgeCheck, GripVertical, Search } from "lucide-react";

import FluidContainer from "../../layout/FLuidContainer";
import Button from "../../common/Button";

import "./LandingFeatures.css";


function LandingFeatures() {
    return (
        <FluidContainer id="features" className="landing-features">
            <p className="landing-features-label">EVERYTHING YOU NEED</p>
            <h2 className="landing-features-title">A better way to track anime</h2>
            <div className="landing-features-grid">
                <div className="landing-features-card">
                    <div className="landing-features-icon">
                        <Search size={20} />
                    </div>
                    <p className="landing-features-name">Search Any Anime</p>
                    <p className="landing-features-desc">Access thousands of titles directly from MyAnimeList via the Jikan API. Find your next obsession instantly.</p>
                </div>
                <div className="landing-features-card">
                    <div className="landing-features-icon">
                        <GripVertical size={20} />
                    </div>
                    <p className="landing-features-name">Drag & Drop Board</p>
                    <p className="landing-features-desc">Move titles between Watch, Watching, and Watched with a satisfying drag. Your progress, visualized.</p>
                </div>
                <div className="landing-features-card">
                    <div className="landing-features-icon">
                        <BadgeCheck size={20} />
                    </div>
                    <p className="landing-features-name">Track Your Progress</p>
                    <p className="landing-features-desc">Your board is synced to your account. Pick up where you left off from any device, any time.</p>
                </div>
            </div>
            <div className="landing-features-banner">
                <div className="landing-features-info">
                    <h2>Ready to start watching smarter?</h2>
                    <p>Join anime fans who never lose track of what's next.</p>
                </div>
                <Button text="Get Started — It's Free" />
            </div>
        </FluidContainer>
    );
}


export default LandingFeatures;
