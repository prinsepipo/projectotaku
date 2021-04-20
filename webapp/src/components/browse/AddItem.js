import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import WatchlistContext from '../../context/WatchlistContext';

import { backendAPI } from '../../utils/api';

import './AddItem.css';


function AddItem(props) {
    const [message, setMessage] = useState('');
    const [exists, setExists] = useState(false);
    const {
        animeList,
        setAnimeList,
        mangaList,
        setMangaList,
    } = useContext(WatchlistContext);
    const history = useHistory();

    useEffect(() => {
        let list;
        if (props.type === 'anime') {
            list = animeList;
        } else if (props.type === 'manga') {
            list = mangaList;
        }

        for (const section in list) {
            const item = list[section].find((element) => element.mal_id === props.item.mal_id);

            if (item) {
                setExists(true);
                setMessage(`Already in ${item.status}.`);
            }
        }
    }, [animeList, mangaList, props.type, props.item.mal_id]);

    // If the current item exists in the user's watchlist,
    // there is no need for the user to add the item.
    if (exists) {
        return (
            <div className='AddItem'>
                <p className='AddItem-text'>{message}</p>
            </div>
        );
    }

    const addTo = (event, item, status) => {
        let list;
        let setList;
        if (props.type === 'anime') {
            list = animeList;
            setList = setAnimeList;
        } else if (props.type === 'manga') {
            list = mangaList;
            setList = setMangaList;
        } else {
            return;
        }

        const headItem = list[status][0];
        const data = {
            mal_id: item.mal_id,
            title: item.title,
            image_url: item.image_url,
            mal_url: item.url,
            type: props.type,
            status: status,
            next_item_id: headItem ? headItem.id : null,
        };

        const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
        backendAPI.post('watchlist/', data, {headers})
            .then((response) => {
                const newList = {...list};
                newList[status].unshift(response.data);
                setList(newList);
                setExists(true);
                setMessage(`Added to ${response.data.status}`);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        history.push('/logout');
                    } else {
                        console.log(error.response.data)
                    }
                } else {
                    history.push('/server-error');
                }
            });
    }

    return (
        <div className='AddItem'>
            <p className='AddItem-text'>Add to:</p>
            <button
                className='AddItem-button'
                type='button'
                onClick={(e) => addTo(e, props.item, 'watch')}
            >Watch</button>
            <button
                className='AddItem-button'
                type='button'
                onClick={(e) => addTo(e, props.item, 'watching')}
            >Watching</button>
            <button
                className='AddItem-button'
                type='button'
                onClick={(e) => addTo(e, props.item, 'watched')}
            >Watched</button>
        </div>
    );
}


export default AddItem;
