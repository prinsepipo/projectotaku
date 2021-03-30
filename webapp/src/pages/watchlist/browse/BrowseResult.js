import BrowseItem from './BrowseItem';

import './BrowseResult.css';


function BrowseResult(props) {
    return (
        <div className='BrowseResult'>
            {props.results.map((item, index) => {
                return (
                    <BrowseItem key={index} item={item} />
                );
            })}
        </div>
    );
}

export default BrowseResult;
