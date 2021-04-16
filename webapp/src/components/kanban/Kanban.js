import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import WatchlistContext from '../../context/WatchlistContext';
import { backendAPI } from '../../utils/api';

import KanbanHeader from './KanbanHeader';
import KanbanSection from './KanbanSection';

import './Kanban.css';


function Kanban(props) {
    const sections = ['watch', 'watching', 'watched'];
    const [watchlist, setWatchlist] = useContext(WatchlistContext);
    const history = useHistory();

    const onDragEnd = ({source, destination, draggableId}) => {
        // Operate only if the destination is not null.
        // If an item was dropped anywhere outside the <Droppable></Droppable>, destination will be null.
        if (destination) {
            // Nothing was changed or the item was dropped in the same position.
            if (source.droppableId === destination.droppableId && source.index === destination.index) {
                return;
            }

            // Update dragged item and its source and destination neighboring items.
            const list = {...watchlist};
            const updatedItems = [];
            const sourceList = list[source.droppableId];
            const destinationList = list[destination.droppableId];

            const sourcePrevItem = sourceList[source.index - 1];
            const sourceNextItem = sourceList[source.index + 1];
            if (sourcePrevItem) {
                sourcePrevItem.next_item_id = sourceNextItem ? sourceNextItem.id : null;
                updatedItems.push(sourcePrevItem);
            }

            let item = sourceList.splice(source.index, 1)[0];
            item.status = destination.droppableId;
            destinationList.splice(destination.index, 0, item);

            item = destinationList[destination.index];
            const destinationPrevItem = destinationList[destination.index - 1];
            const destinationNextItem = destinationList[destination.index + 1];
            if (destinationPrevItem) {
                destinationPrevItem.next_item_id = item ? item.id : null;
                updatedItems.push(destinationPrevItem);
            }

            item.next_item_id = destinationNextItem ? destinationNextItem.id : null;
            updatedItems.push(item);

            setWatchlist(list);

            // Persist changes to database.
            for (let i = 0; i < updatedItems.length; i++) {
                const item = updatedItems[i];
                const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
                backendAPI.put(`watchlist/${item.id}/`, item, {headers})
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                history.push('/logout');
                            } else {
                                console.log(error.response.data);
                            }
                        } else {
                            history.push('/server-error');
                        }
                    });
            }
        }
    }

    return (
        <div className='Kanban'>
            <KanbanHeader />
            <div className='KanbanWrapper'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className='KanbanContent'>
                        {sections.map((section, index) => {
                            return <KanbanSection key={index} section={section} list={watchlist[section]} />;
                        })}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}


export default Kanban;
