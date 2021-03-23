import React from 'react';

import Kanban from './kanban/Kanban';
import Browse from './browse/Browse';

import './Watchlist.css';


class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBrowsing: false,
        };
    }

    render() {
        return (
            <div className='Watchlist'>
                <div className='WatchlistHeader'>
                    <div className='WatchlistHeaderContainer'>
                        <a className='WatchlistHeader-link' href='/watchlist'>Project Otaku</a>
                    </div>
                </div>
                <Kanban toggleBrowsing={this.toggleBrowsing} />
                <Browse isBrowsing={this.state.isBrowsing} toggleBrowsing={this.toggleBrowsing} />
            </div>
        );
    }

    toggleBrowsing = () => {
        this.setState({
            isBrowsing: !this.state.isBrowsing,
        });
    }
}


export default Watchlist;
