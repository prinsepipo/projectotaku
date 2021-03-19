import React from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
} from 'react-beautiful-dnd';

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
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className='Kanban-content'>
                        {this.state.sections.map((section, index) => {
                            return (
                                <div className='Kanban-section' key={index}>
                                    <div className='Kanban-section-header'>
                                        <h2 className='Kanban-section-title'>
                                            {section.charAt(0).toUpperCase() + section.slice(1)}
                                        </h2>
                                    </div>
                                    <Droppable droppableId={section}>
                                        {(provided) => (
                                            <div
                                              className='Kanban-list'
                                              ref={provided.innerRef}
                                              {...provided.droppableProps}
                                            >
                                                {this.state.list[section].map((item, index) => {
                                                    return (
                                                        <Draggable
                                                          key={item.id}
                                                          draggableId={item.id.toString()}
                                                          index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                  className='Kanban-listitem'
                                                                  ref={provided.innerRef}
                                                                  {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                                >
                                                                    <img
                                                                    className='Kanban-listitem-image'
                                                                    src={item.image_url}
                                                                    alt={item.title}
                                                                    />
                                                                    <p className='Kanban-listitem-title'>{item.title}</p>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
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
