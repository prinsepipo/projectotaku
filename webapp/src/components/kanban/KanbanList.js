import KanbanItem from './KanbanItem';

import './KanbanList.css';


function KanbanList(props) {
    const WrapperComponent = (props) => (
        <div
            className='KanbanList'
            ref={props.provided.innerRef}
            {...props.provided.droppableProps}
        >
            {props.children}
        </div>
    )

    if (!props.list) {
        return (
            <WrapperComponent {...props}>
                Empty
            </WrapperComponent>
        );
    }

    return (
        <WrapperComponent {...props}>
            {props.list.map((item, index) => {
                return (
                    <KanbanItem key={item.id} item={item} index={index} />
                );
            })}
            {props.provided.placeholder}
        </WrapperComponent>
    );
}


export default KanbanList;
