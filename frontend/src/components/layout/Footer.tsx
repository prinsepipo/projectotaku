import FluidContainer from "./FLuidContainer";
import "./Footer.css";


function Footer() {
    return (
        <div className="footer">
            <FluidContainer>
                <h3 className="footer-logo">⛩ ProjectOtaku</h3>
                <p className="footer-label">© 2026 ProjectOtaku · Powered by Jikan API (MyAnimeList)</p>
            </FluidContainer>
        </div>
    );
}


export default Footer;
