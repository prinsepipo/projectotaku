import { Droppable } from 'react-beautiful-dnd';

import KanbanListItem from './KanbanListItem';


function KanbanSection(props) {
    return (
        <div className='KanbanSection'>
            <div className='KanbanSectionHeader'>
                <h2 className='KanbanSectionHeader-title'>
                    {props.section}
                </h2>
            </div>
            <Droppable droppableId={props.section}>
                {(provided) => (
                    <div
                        className='KanbanList'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.list.map((item, index) => {
                            return (
                                <KanbanListItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}


export default KanbanSection;
