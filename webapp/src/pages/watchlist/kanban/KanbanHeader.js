import KanbanToolbar from './KanbanToolbar';

import './KanbanHeader.css';


function KanbanHeader(props) {
    return (
        <div className='KanbanHeader'>
            <div className='KanbanHeaderContent'>
                <h2 className='KanbanHeader-title'>Your Anime List</h2>
                <KanbanToolbar toggleBrowsing={props.toggleBrowsing} />
            </div>
        </div>
    );
}


export default KanbanHeader;
