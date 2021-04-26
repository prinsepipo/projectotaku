import './MainContent.css';


function MainContent(props) {
    return (
        <div className='MainContent'>
            {props.children}
        </div>
    );
}

export default MainContent;
