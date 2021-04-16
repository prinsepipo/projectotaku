import { Droppable } from 'react-beautiful-dnd';

import KanbanList from './KanbanList';

import './KanbanSection.css';


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
                    <KanbanList provided={provided} list={props.list} />
                )}
            </Droppable>
        </div>
    );
}


export default KanbanSection;
