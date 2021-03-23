import React from 'react';
import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Browse.css';


class BrowseModal extends React.Component {
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
                        <div className='BrowseSearchBar'>
                            <input className='BrowseSearchBar-input' type='text' placeholder='Search anime...' onKeyPress={this.handleKeyPress} />
                            <button className='BrowseSearchBar-button' type='button'>
                                <FontAwesomeIcon icon='search' />
                            </button>
                        </div>
                        <div className='BrowseSearchResult'>
                        </div>
                    </div>
                </div>
            </ReactModal>
        );
    }
}


export default BrowseModal;
