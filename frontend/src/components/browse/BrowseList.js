import BrowseItem from './BrowseItem';

import './BrowseList.css';


function BrowseList(props) {
    return (
        <div className='BrowseList'>
            {props.list.map((item, index) => {
                return (
                    <BrowseItem key={index} item={item} type={props.type} />
                );
            })}
        </div>
    );
}

export default BrowseList;
