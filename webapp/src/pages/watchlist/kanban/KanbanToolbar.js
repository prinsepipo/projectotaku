import FindAnime from './FindAnime';

import './KanbanToolbar.css';


function KanbanToolbar(props) {
    return (
        <div className='KanbanToolbar'>
            <FindAnime onClick={props.toggleBrowsing} />
        </div>
    );
}


export default KanbanToolbar;
