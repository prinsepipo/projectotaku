import { Draggable } from 'react-beautiful-dnd';


function KanbanListItem(props) {
    return (
        <Draggable draggableId={props.item.id.toString()} index={props.index}>
            {(provided) => (
                <div
                    className='KanbanListItem'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img
                        className='KanbanListItem-image'
                        src={props.item.image_url}
                        alt={props.item.title}
                    />
                    <p className='KanbanListItem-title'>{props.item.title}</p>
                </div>
            )}
        </Draggable>
    );
}


export default KanbanListItem;
