import Navbar from "../components/layout/Navbar";
import Hero from "../components/brand/Hero";
import LandingFeatures from "../components/features/landing/LandingFeatures";
import Footer from "../components/layout/Footer";

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <LandingFeatures />
      <Footer />
    </div>
  );
}

export default LandingPage;
