import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WatchlistContext from '../../context/WatchlistContext';
import { backendAPI } from '../../utils/api';

import './KanbanItem.css';


function KanbanItem(props) {
    const [watchlist, setWatchlist] = useContext(WatchlistContext);
    const [modifier, setModifier] = useState('');
    const history = useHistory();

    const deleteItem = (e) => {
        const list = {...watchlist};
        const itemIndex = list[props.item.status].findIndex((element) => element.id === props.item.id);
        const prevItem = list[props.item.status][itemIndex - 1];
        const nextItem = list[props.item.status][itemIndex + 1];

        if (prevItem) {
            prevItem.next_item_id = nextItem ? nextItem.id : null;

            const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
            backendAPI.put(`watchlist/${prevItem.id}/`, prevItem, {headers})
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

        setModifier('shrink')

        list[props.item.status].splice(itemIndex, 1);

        setTimeout(() => setWatchlist(list), 500);

        const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
        backendAPI.delete(`watchlist/${props.item.id}/`, {headers})
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

    return (
        <Draggable draggableId={props.item.id.toString()} index={props.index}>
            {(provided) => (
                <div
                    className={'KanbanItem KanbanItem--' + modifier}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img
                        className='KanbanItem-image'
                        src={props.item.image_url}
                        alt={props.item.title}
                    />
                    <p className='KanbanItem-title'>{props.item.title}</p>
                    <button className='KanbanItem-delete' onClick={deleteItem}>
                        <FontAwesomeIcon icon='trash' />
                    </button>
                </div>
            )}
        </Draggable>
    );
}


export default KanbanItem;
