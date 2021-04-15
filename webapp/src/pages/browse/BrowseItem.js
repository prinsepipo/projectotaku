import AddItemOptions from './AddItemOptions';

import './BrowseItem.css';


function BrowseItem(props) {
    return (
        <div className='BrowseItem'>
            <img
                className='BrowseItem-img'
                src={props.item.image_url}
                alt={props.item.title}
            />
            <div className='BrowseItem-details'>
                <a
                    className='BrowseItem-title'
                    href={props.item.url}
                    title={props.item.url}
                    target='_blank'
                    rel='noreferrer'
                >
                    {props.item.title} - ({props.item.type}) {props.item.episodes} episode/s
                </a>
                <p className='BrowseItem-synopsis'>{props.item.synopsis}</p>
                <AddItemOptions item={props.item} />
            </div>
        </div>
    );
}


export default BrowseItem;
