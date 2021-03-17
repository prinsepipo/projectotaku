import React from "react";

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
    }

    render() {
        return (
            <div className='Kanban'>
                <div className='Kanban-content'>
                    {this.state.sections.map((section, index) => {
                        return (
                            <div className='Kanban-section' key={index}>
                                <div className='Kanban-section-header'>
                                    <h2 className='Kanban-section-title'>
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </h2>
                                </div>
                                <div className='Kanban-list'>
                                    {this.state.list[section].map((item) => {
                                        return (
                                            <div className='Kanban-listitem' key={item.id}>
                                                <img className='Kanban-listitem-image' src={item.image_url} alt={item.title} />
                                                <p className='Kanban-listitem-title'>{item.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}


export default Kanban;
