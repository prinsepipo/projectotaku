import React from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import Kanban from './kanban/Kanban';
import Browse from './browse/Browse';
import AccountOptions from './AccountOptions';

import './Watchlist.css';


class Watchlist extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            isBrowsing: false,
        };
    }

    render() {
        if (!this.context.isAuthenticated) {
            return <Redirect push to='/' />
        }

        return (
            <div className='Watchlist'>
                <div className='WatchlistHeader'>
                    <div className='WatchlistHeaderContainer'>
                        <a className='WatchlistHeader-link' href='/watchlist'>Project Otaku</a>
                        <AccountOptions />
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
