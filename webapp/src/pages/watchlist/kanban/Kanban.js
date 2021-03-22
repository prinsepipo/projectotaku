import React from "react";

import {
    DragDropContext,
} from 'react-beautiful-dnd';

import KanbanHeader from './KanbanHeader';
import KanbanSection from './KanbanSection';

// Styling for all kanban related classes will all be stored here.
import './Kanban.css';

import { list } from './data';


class Kanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                watch: list.filter((item) => item.status === 'watch'),
                watching: list.filter((item) => item.status === 'watching'),
                watched: list.filter((item) => item.status === 'watched'),
            },
            sections: ['watch', 'watching', 'watched',],
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    render() {
        return (
            <div className='Kanban'>
                <KanbanHeader />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className='KanbanContent'>
                        {this.state.sections.map((section, index) => {
                            return (
                                <KanbanSection
                                    key={index}
                                    section={section}
                                    list={this.state.list[section]}
                                />
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>
        );
    }

    onDragEnd({source, destination, draggableId}) {
        // Operate only if the destination is not null.
        // If an item was dropped anywhere outside the <Droppable></Droppable>, destination will be null.
        if (destination) {
            // Nothing was changed or the item was dropped in the same position.
            if (source.droppableId === destination.droppableId && source.index === destination.index) {
                return;
            }

            // Update the list where the dragged item will be removed.
            const list = this.state.list;
            const sourceList = list[source.droppableId];
            const item = sourceList.splice(source.index, 1)[0];
            // Update the list where the dragged item will be inserted.
            const destinationList = list[destination.droppableId];
            destinationList.splice(destination.index, 0, item);

            this.setState({
                list,
            });
        }
    }
}


export default Kanban;
