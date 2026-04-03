import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './KanbanItem.css';


function KanbanItem(props) {
    const [modifier, setModifier] = useState('');

    const deleteItem = () => {
        setModifier('shrink');

        props.handleDelete(props.item);
    }

    const formattedTitle = () => {
        if (props.item.title.length > 40) {
            return props.item.title.substring(0, 40) + '...';
        }

        return props.item.title;
    };

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
                    <p className='KanbanItem-title' title={props.item.title}>{formattedTitle()}</p>
                    <button className='KanbanItem-delete' title="Remove Item" onClick={deleteItem}>
                        <FontAwesomeIcon icon='trash' />
                    </button>
                </div>
            )}
        </Draggable>
    );
}


export default KanbanItem;
