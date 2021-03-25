import React from 'react';
import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { jikanAPI } from '../../../utils/api';

import './Browse.css';


class BrowseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
        };
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.isBrowsing}
                appElement={document.getElementById('root')}
                parentSelector={() => document.getElementById('modal-root')}
            >
                <div className='Browse'>
                    <div className='BrowseHeader'>
                        <h2 className='BrowseHeader-title'>Browse</h2>
                        <button className='BrowseHeader-button-close' onClick={this.props.toggleBrowsing}>Close</button>
                    </div>
                    <div className='BrowseSearch'>
                        <form className='BrowseSearchBar' onSubmit={this.handleSearch}>
                            <input
                                className='BrowseSearchBar-input'
                                type='text'
                                value={this.state.query}
                                placeholder='Search anime...'
                                onChange={this.handleChange}
                            />
                            <button className='BrowseSearchBar-button' type='submit'>
                                <FontAwesomeIcon icon='search' />
                            </button>
                        </form>
                        <div className='BrowseSearchResult'>
                            {this.state.results.map((item, index) => {
                                return (
                                    <div className='BrowseSearchItem' key={index}>
                                        <img
                                            className='BrowseSearchItem-img'
                                            src={item.image_url}
                                            alt={item.title}
                                        />
                                        <div className='BrowseSearchItem-details'>
                                            <a
                                                className='BrowseSearchItem-title'
                                                href={item.url}
                                                title={item.url}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                {item.title} - ({item.type}) {item.episodes} episode/s
                                            </a>
                                            <p className='BrowseSearchItem-synopsis'>{item.synopsis}</p>
                                            <div className='BrowseFlair'>
                                                <span>Add to: </span>
                                                <button className='BrowseFlair-item' type='button' onClick={() => console.log('Add to watch list')}>Watch</button>
                                                <button className='BrowseFlair-item' type='button' onClick={() => console.log('Add to watching list')}>Watching</button>
                                                <button className='BrowseFlair-item' type='button' onClick={() => console.log('Add to watched list')}>Watched</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ReactModal>
        );
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value,
        });
    }

    handleSearch = (event) => {
        event.preventDefault();

        if (this.state.query) {
            jikanAPI.get(`search/anime?q=${this.state.query}`)
                .then((response) => {
                    this.setState({
                        results: response.data.results,
                    });
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    }
}


export default BrowseModal;
