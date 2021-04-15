import Navbar from './Navbar';
import MainContent from './MainContent';

import './Layout.css';


function Layout(props) {
    return (
        <div className='Layout'>
            <Navbar />
            <MainContent>
                {props.children}
            </MainContent>
        </div>
    );
}


export default Layout;
