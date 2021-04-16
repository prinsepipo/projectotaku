import { useState, useEffect } from 'react';

import { jikanAPI } from '../../utils/api';

import BrowseSearchBar from './BrowseSearchBar';
import BrowseResult from './BrowseResult';
import Loading from '../loadings/Loading';

import './BrowseContent.css';


function BrowseContent() {
    const [prevQuery, setPrevQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        jikanAPI.get('https://api.jikan.moe/v3/season')
            .then((response) => {
                setResults(response.data.anime);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, [])

    const handleSearch  = (event, query) => {
        event.preventDefault();

        if (query === prevQuery) {
            return;
        }

        setPrevQuery(query);
        setIsLoading(true);

        jikanAPI.get(`/search/anime?q=${query}`)
            .then((response) => {
                setResults(response.data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    return (
        <div className='BrowseContent'>
            <BrowseSearchBar handleSearch={handleSearch} />
            {isLoading ? <Loading /> : <BrowseResult results={results} />}
        </div>
    );
}


export default BrowseContent;
