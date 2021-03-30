import './BrowseHeader.css';

function BrowseHeader(props) {
    return (
        <div className='BrowseHeader'>
            <h2 className='BrowseHeader-title'>Browse</h2>
            <button className='BrowseHeader-close' onClick={props.toggleBrowsing}>Close</button>
        </div>
    );
}


export default BrowseHeader;
