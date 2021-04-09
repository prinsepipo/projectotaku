import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import WatchlistContext from '../../../context/WatchlistContext';

import { backendAPI } from '../../../utils/api';

import './AddItemOptions.css';


function AddItemOptions(props) {
    const [message, setMessage] = useState('');
    const [exists, setExists] = useState(false);
    const [watchlist, setWatchlist] = useContext(WatchlistContext);
    const history = useHistory();

    useEffect(() => {
        for (const section in watchlist) {
            const item = watchlist[section].find((element) => element.mal_id === props.item.mal_id);

            if (item) {
                setExists(true);
                setMessage(`Already in ${item.status}.`);
            }
        }
    }, [watchlist, props.item.mal_id]);

    // If the current item exists in the user's watchlist,
    // there is no need for the user to add the item.
    if (exists) {
        return (
            <div className='AddItemOptions'>{message}</div>
        );
    }

    const addTo = (event, item, status) => {
        const headItem = watchlist[status][0];
        const data = {
            mal_id: item.mal_id,
            title: item.title,
            image_url: item.image_url,
            mal_url: item.url,
            type: 'anime',
            status: status,
            next_item_id: headItem ? headItem.id : null,
        };

        const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
        backendAPI.post('watchlist/', data, {headers})
            .then((response) => {
                const list = {...watchlist};
                list[status].unshift(response.data);
                setWatchlist(list);
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
        <div className='AddItemOptions'>
            <span>Add to: </span>
            <button
                className='AddItemOptions-button'
                type='button'
                onClick={(e) => addTo(e, props.item, 'watch')}
            >Watch</button>
            <button
                className='AddItemOptions-button'
                type='button'
                onClick={(e) => addTo(e, props.item, 'watching')}
            >Watching</button>
            <button
                className='AddItemOptions-button'
                type='button'
                onClick={(e) => addTo(e, props.item, 'watched')}
            >Watched</button>
        </div>
    );
}


export default AddItemOptions;
