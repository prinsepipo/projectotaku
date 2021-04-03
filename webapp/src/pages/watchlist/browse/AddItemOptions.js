import { useContext } from 'react';
import { withRouter } from 'react-router';

import WatchlistContext from '../../../context/WatchlistContext';

import { backendAPI } from '../../../utils/api';

import './AddItemOptions.css';


function AddItemOptions(props) {
    const [watchlist, setWatchlist] = useContext(WatchlistContext);

    const exists = () => watchlist.find((item) => item.mal_id === props.item.mal_id);
    if (exists()) {
        return null;
    }

    const addTo = (event, item, status) => {
        const data = {
            mal_id: item.mal_id,
            title: item.title,
            image_url: item.image_url,
            mal_url: item.url,
            type: 'anime',
            status: status,
        };

        const headers = { Authorization: `Token ${localStorage.getItem('TOKEN')}` };
        backendAPI.post('watchlist/', data, {headers})
            .then((response) => {
                setWatchlist((oldValue) => [...oldValue, response.data]);
            })
            .catch((error) => {
                if (error.response) {
                    // Handle response error.
                    console.log(error.response.data)
                } else {
                    props.history.push('/server-error');
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


export default withRouter(AddItemOptions);
