import { useState } from 'react';

import { jikanAPI } from '../../utils/api';

import BrowseSearchBar from './BrowseSearchBar';
import BrowseResult from './BrowseResult';

import './BrowseContent.css';


function BrowseContent() {
    const [results, setResults] = useState([]);

    const handleSearch  = (event, query) => {
        event.preventDefault();

        jikanAPI.get(`/search/anime?q=${query}`)
            .then((response) => {
                setResults(response.data.results);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    return (
        <div className='BrowseContent'>
            <BrowseSearchBar handleSearch={handleSearch} />
            <BrowseResult results={results} />
        </div>
    );
}


export default BrowseContent;
