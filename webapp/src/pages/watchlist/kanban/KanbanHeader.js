import AddAnimeButton from './AddItemButton';


function KanbanHeader(props) {
    return (
        <div className='KanbanHeader'>
            <div className='KanbanHeaderContent'>
                <h2 className='KanbanHeader-title'>Your Anime List</h2>
                <div className='KanbanToolbar'>
                    <AddAnimeButton onClick={props.toggleBrowsing} />
                </div>
            </div>
        </div>
    );
}


export default KanbanHeader;
