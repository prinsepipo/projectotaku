import { useState, useEffect } from 'react';

import { jikanAPI } from '../../api';

import BrowseHeader from './BrowseHeader';
import BrowseContent from './BrowseContent';
import BrowseSearchBar from './BrowseSearchBar';
import BrowseList from './BrowseList';
import Loading from '../loadings/Loading';

import './Browse.css';


function Browse (props) {
    const [airingAnime, setAiringAnime] = useState([]);
    const [animeResult, setAnimeResult] = useState([]);
    const [mangaResult, setMangaResult] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const maxResult = 10;

    useEffect(() => {
        setIsLoading(true);

        jikanAPI.get('season')
            .then((response) => {
                setAiringAnime(response.data.anime);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const search = (query) => {
        setHasSearched(true);
        setIsLoading(true);

        let searchingAnime = true;
        let searchingManga = true;

        jikanAPI.get(`search/anime?q=${query}`)
            .then((response) => {
                setAnimeResult(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                searchingAnime = false;

                if (!searchingAnime && !searchingManga) {
                    setIsLoading(false);
                }
            });

        jikanAPI.get(`search/manga?q=${query}`)
            .then((response) => {
                // By default, the manga search returns both manga and light novels.
                // We only want the manga.
                setMangaResult(response.data.results.filter((element) => (
                    element.type === 'Manga' || element.type === 'Manhwa'
                )));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                searchingManga = false;

                if (!searchingAnime && !searchingManga) {
                    setIsLoading(false);
                }
            });
    };

    let content = (
        <>
            <h3>Airing</h3>
            <BrowseList list={airingAnime} type='anime' />
        </>
    );

    if (hasSearched) {
        content = (
            <>
                <div>
                    <h3>Anime</h3>
                    <BrowseList list={animeResult.slice(0, maxResult)} type='anime' />
                </div>
                <div>
                    <h3>Manga</h3>
                    <BrowseList list={mangaResult.slice(0, maxResult)} type='manga' />
                </div>
            </>
        )
    }

    return (
        <div className='Browse'>
            <BrowseHeader />
            <BrowseContent>
                <BrowseSearchBar search={search} />
                {isLoading ? <Loading /> : content }
            </BrowseContent>
        </div>
    );
}


export default Browse;
