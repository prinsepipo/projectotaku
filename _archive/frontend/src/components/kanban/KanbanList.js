import './KanbanList.css';


function KanbanList(props) {
    return (
        <div
            className='KanbanList'
            ref={props.provided.innerRef}
            {...props.provided.droppableProps}
        >
            {props.children}
        </div>
    );
}


export default KanbanList;
