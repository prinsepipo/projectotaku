import './AddItemOptions.css';


function AddItemOptions(props) {
    return (
        <div className='AddItemOptions'>
            <span>Add to: </span>
            <button
                className='AddItemOptions-button'
                type='button'
                onClick={() => console.log('Add to watch list')}
            >Watch</button>
            <button
                className='AddItemOptions-button'
                type='button'
                onClick={() => console.log('Add to watching list')}
            >Watching</button>
            <button
                className='AddItemOptions-button'
                type='button'
                onClick={() => console.log('Add to watched list')}
            >Watched</button>
        </div>
    );
}


export default AddItemOptions;
