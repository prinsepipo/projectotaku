import KanbanItem from './KanbanItem';

import './KanbanList.css';


function KanbanList(props) {
    return (
        <div
            className='KanbanList'
            ref={props.provided.innerRef}
            {...props.provided.droppableProps}
        >
            {props.list.map((item, index) => {
                return (
                    <KanbanItem key={item.id} item={item} index={index} />
                );
            })}
            {props.provided.placeholder}
        </div>
    );
}


export default KanbanList;
