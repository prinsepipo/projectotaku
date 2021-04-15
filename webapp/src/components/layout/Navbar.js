import NavLink from './NavLink';
import AccountOptions from '../AccountOptions';

import './Navbar.css';


function Navbar(props) {
    return (
        <div className='Navbar'>
            <div className='NavbarInner'>
                <a className='NavbarHeader' href='/'>Project Otaku</a>
                <ul className='NavbarNav'>
                    <li className='NavbarNav-item'>
                        <NavLink path='/watchlist' title='Watchlist' />
                    </li>
                    <li className='NavbarNav-item'>
                        <NavLink path='/browse' title='Browse' />
                    </li>
                </ul>
                <AccountOptions />
            </div>
        </div>
    );
}


export default Navbar;
