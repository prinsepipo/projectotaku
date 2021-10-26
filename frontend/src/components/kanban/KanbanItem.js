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
                    <button className='KanbanItem-delete' title="Remove Item" onClick={deleteItem}>
                        <FontAwesomeIcon icon='trash' />
                    </button>
                    <p className="KanbanItem-index">{props.index}</p>
                </div>
            )}
        </Draggable>
    );
}


export default KanbanItem;
