import { useEffect, useState } from 'react';

import './WatchlistSearch.css';


function WatchlistSearch(props) {
    const [title, setTitle] = useState('');

    // Iterate through the kanban list items and match the query to the titles.
    // Hide the items that does not match the queried title.
    useEffect(() => {
        const kanban = document.getElementsByClassName('KanbanList');

        for (let i = 0; i < kanban.length; i++) {
            const kanbanList = kanban[i];

            const items = kanbanList.childNodes;

            items.forEach((element) => {
                if (element.textContent.toLowerCase().indexOf(title.toLowerCase()) === -1) {
                    element.style.display = 'none';
                } else {
                    // Set it back to the original display style.
                    // Since the item targeted is a kanban item, you can refer to KanbanItem.css
                    // for the styling.
                    element.style.display = 'flex';
                }
            })
        }
    }, [title])

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const clearTitle = (e) => {
        setTitle('');
    }

    return (
        <div className='WatchlistSearch'>
            <input
                className='WatchlistSearch-input'
                type='text'
                value={title}
                placeholder='Find anime/manga in list.'
                onChange={handleChange}
            />
            {title !== ''
            ? <button className='WatchlistSearch-button' onClick={clearTitle}>x</button>
            : null}
        </div>
    );
}


export default WatchlistSearch;
