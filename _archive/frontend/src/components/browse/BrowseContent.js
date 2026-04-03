import './BrowseContent.css';


function BrowseContent(props) {
    return (
        <div className='BrowseContent'>
            {props.children}
        </div>
    );
}


export default BrowseContent;
