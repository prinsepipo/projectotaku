import BrowseHeader from './BrowseHeader';
import BrowseContent from './BrowseContent';

import './Browse.css';


function Browse (props) {
    return (
        <div className='Browse'>
            <BrowseHeader />
            <BrowseContent />
        </div>
    );
}


export default Browse;
