import Logo from '../brand/Logo';
import FluidContainer from './FLuidContainer';
import NavLinkButton from '../common/NavLinkButton';

import './Navbar.css';


function Navbar() {
    return (
        <nav className="navbar">
            <FluidContainer className="navbar-container">
                <a href='/'><Logo /></a>
                <ul className='navbar-links'>
                    <li className='navbar-links__item'>
                        <a href='#features'>Features</a>
                    </li>
                    <li className='navbar-links__item'>
                        <a href='#howto'>How it works</a>
                    </li>
                </ul>
                <div className="navbar-buttons">
                    <NavLinkButton to="/signin" style="ghost">Login</NavLinkButton>
                    <NavLinkButton to="/signup" style="primary">Sign Up</NavLinkButton>
                </div>
            </FluidContainer>
        </nav>
    );
}


export default Navbar;
