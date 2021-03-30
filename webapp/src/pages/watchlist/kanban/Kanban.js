import { useState, useEffect } from "react";
import {
    DragDropContext,
} from 'react-beautiful-dnd';


import KanbanHeader from './KanbanHeader';
import KanbanSection from './KanbanSection';

// Styling for all kanban related classes will all be stored here.
import './Kanban.css';

function Kanban(props) {
    const [list, setList] = useState({
        watch: [],
        watching: [],
        watched: [],
    });
    const sections = ['watch', 'watching', 'watched'];

    useEffect(() => {
        setList({
            watch: props.watchlist.filter((item) => item.status === 'watch'),
            watching: props.watchlist.filter((item) => item.status === 'watching'),
            watched: props.watchlist.filter((item) => item.status === 'watched'),
        })
    }, [props.watchlist]);

    const onDragEnd = ({source, destination, draggableId}) => {
        // Operate only if the destination is not null.
        // If an item was dropped anywhere outside the <Droppable></Droppable>, destination will be null.
        if (destination) {
            // Nothing was changed or the item was dropped in the same position.
            if (source.droppableId === destination.droppableId && source.index === destination.index) {
                return;
            }

            // Update the list where the dragged item will be removed.
            const newList = list;
            const sourceList = newList[source.droppableId];
            const item = sourceList.splice(source.index, 1)[0];
            // Update the list where the dragged item will be inserted.
            const destinationList = newList[destination.droppableId];
            destinationList.splice(destination.index, 0, item);

            setList(newList);
        }
    }

    return (
        <div className='Kanban'>
            <KanbanHeader toggleBrowsing={props.toggleBrowsing} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='KanbanContent'>
                    {sections.map((section, index) => {
                        return <KanbanSection key={index} section={section} list={list[section]} />;
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}


export default Kanban;
