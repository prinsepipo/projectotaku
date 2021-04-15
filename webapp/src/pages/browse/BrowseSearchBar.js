import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BrowseSearchBar.css';


function BrowseSearchBar(props) {
    const [query, setQuery] = useState('');

    const handleChange = (event) => setQuery(event.target.value);
    const handleSearch = (event) => props.handleSearch(event, query);

    return (
        <form className='BrowseSearchBar' onSubmit={handleSearch}>
            <input
                className='BrowseSearchBar-input'
                type='text'
                value={query}
                placeholder='Search anime...'
                onChange={handleChange}
            />
            <button className='BrowseSearchBar-button' type='submit'>
                <FontAwesomeIcon icon='search' />
            </button>
        </form>
    );
}


export default BrowseSearchBar;
