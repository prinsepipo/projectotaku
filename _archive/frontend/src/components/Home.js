import { useState, useContext, useEffect } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';

import axios from 'axios';

import UserContext from '../context/UserContext';
import WatchlistContext from '../context/WatchlistContext';

import jikan from '../api/jikan';

import Navbar from './layout/navbar/Navbar';
import MainContent from './layout/MainContent';
import Watchlist from './watchlist/Watchlist';
import Browse from './browse/Browse';

import './Home.css';


function Home(props) {
    const [isFetchingWatchlist, setIsFetchingWatchlist] = useState(false);
    const [isFetchingAiringAnime, setIsFetchingAiringAnime] = useState(false);
    const [airingAnime, setAiringAnime] = useState([]);
    const {isAuthenticated} = useContext(UserContext);
    const {
        setAnimeList,
        setMangaList,
    } = useContext(WatchlistContext);
    const history = useHistory();

    // Fetch watchlist.
    useEffect(() => {
        let mounted = true;
        const source = axios.CancelToken.source();

        if (mounted) {
            setIsFetchingWatchlist(true);
        }

        const headers = {
            Authorization: `Token ${localStorage.getItem('TOKEN')}`,
        };
        axios.get('/api/watchlist/', {headers, cancelToken: source.token})
            .then((response) => {
                // Order watchlist items based on its status/section and link/position.
                const list = response.data;

                const orderForWatchlist = (list) => {
                    const newList = {
                        watch: [],
                        watching: [],
                        watched: [],
                    };

                    for (const section in newList) {
                        const sectionList = newList[section];
                        const filteredList = list.filter((element) => element.status === section);

                        while (filteredList.length !== 0) {
                            if (sectionList.length === 0) {
                                const tailItemIndex = filteredList.findIndex((element) => element.next_item_id === null);
                                const tailItem = filteredList.splice(tailItemIndex, 1)[0];
                                sectionList.unshift(tailItem);
                            } else {
                                const headItem = sectionList[0];
                                const prevItemIndex = filteredList.findIndex((element) => element.next_item_id === headItem.id);
                                const prevItem = filteredList.splice(prevItemIndex, 1)[0];
                                sectionList.unshift(prevItem);
                            }
                        }
                    }

                    return newList;
                };

                const filteredListAnime = list.filter((element) => element.type === 'anime');
                const filteredListManga = list.filter((element) => element.type === 'manga');

                if (mounted) {
                    setAnimeList(orderForWatchlist(filteredListAnime));
                    setMangaList(orderForWatchlist(filteredListManga));
                }
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('fetch watchlist canceled.');
                } else if (error.response) {
                    // Token used for authentication is no longer valid.
                    if (error.response.status === 401) {
                        history.push('/logout');
                    }
                } else {
                    console.log(error);
                }
            })
            .finally(() => {
                if (mounted) {
                    setIsFetchingWatchlist(false);
                }
            });

        return () => {
            mounted = false;
            source.cancel();
        }
    }, [setAnimeList, setMangaList, history]);

    // Fetch season anime for browse page.
    // It will be efficient to fetch it here in the parent component once, instead of fetching it
    // everytime we visit the browse page.
    useEffect(() => {
        setIsFetchingAiringAnime(true);

        const getSeasonalAnime = async () => {
            const result = await jikan.getSeasonalAnime();
            setAiringAnime(result);
            setIsFetchingAiringAnime(false);
        };

        getSeasonalAnime();
    }, []);

    if (!isAuthenticated) {
        return <Redirect to='/logout' />
    }

    return (
        <div className='Home'>
            <Navbar />
            <MainContent>
                <Switch>
                    <Route path='/watchlist'>
                        <Watchlist isFetchingWatchlist={isFetchingWatchlist} />
                    </Route>
                    <Route path='/browse'>
                        <Browse
                            airingAnime={airingAnime}
                            isFetchingAiringAnime={isFetchingAiringAnime}
                        />
                    </Route>
                    <Route exact path='/'>
                        <Redirect to='/watchlist' />
                    </Route>
                    <Route path='*'>
                        <Redirect to='/404' />
                    </Route>
                </Switch>
            </MainContent>
        </div>
    );
}


export default Home;
