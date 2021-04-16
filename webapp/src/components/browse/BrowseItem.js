import { useEffect, useState } from 'react';

import AddItem from './AddItem';

import './BrowseItem.css';


function BrowseItem(props) {
    const [title, setTitle] = useState('');
    const maxTitleLength = 40;

    useEffect(() => {
        if (props.item.title.length >= maxTitleLength) {
            setTitle(props.item.title.substring(0, maxTitleLength - 1) + '...');
        } else {
            setTitle(props.item.title);
        }
    }, [props.item.title])

    return (
        <div className='BrowseItem'>
            <div className='BrowseItemImage'>
                <img
                    className='BrowseItem-img'
                    src={props.item.image_url}
                    alt={props.item.title}
                />
            </div>
            <div className='BrowseItemDetails'>
                <a
                    className='BrowseItem-title'
                    href={props.item.url}
                    title={props.item.url}
                    target='_blank'
                    rel='noreferrer'
                >
                    {title}
                </a>
            </div>
            <div className='BrowseItemOptions'>
                <AddItem item={props.item} />
            </div>
        </div>
    );
}


export default BrowseItem;
