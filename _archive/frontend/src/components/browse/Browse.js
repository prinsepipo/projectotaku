import { useState } from 'react';

import jikan from '../../api/jikan';

import BrowseHeader from './BrowseHeader';
import BrowseContent from './BrowseContent';
import BrowseSearchBar from './BrowseSearchBar';
import BrowseList from './BrowseList';
import BrowseItemPlaceholder from './BrowseItemPlaceholder';

import './Browse.css';


function Browse (props) {
    const [animeResult, setAnimeResult] = useState([]);
    const [mangaResult, setMangaResult] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const search = async (query) => {
        setHasSearched(true);
        setIsLoading(true);

        const anime = await jikan.searchAnime(query);
        setAnimeResult(anime);

        const manga = await jikan.searchManga(query);
        setMangaResult(manga);

        setIsLoading(false);
    };

    let content = (
        <>
            <h3>Airing</h3>
            <BrowseList list={props.airingAnime} type='anime' />
        </>
    );

    if (hasSearched) {
        content = (
            <>
                <div>
                    <h3>Anime</h3>
                    <BrowseList list={animeResult} type='anime' />
                </div>
                <div>
                    <h3>Manga</h3>
                    <BrowseList list={mangaResult} type='manga' />
                </div>
            </>
        )
    }

    return (
        <div className='Browse'>
            <BrowseHeader />
            <BrowseContent>
                <BrowseSearchBar search={search} />
                {isLoading || props.isFetchingAiringAnime ? <BrowseItemPlaceholder /> : content }
            </BrowseContent>
        </div>
    );
}


export default Browse;
