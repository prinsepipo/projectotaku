import './AddItemButton.css';


function AddItemButton(props) {
    return (
        <button className='AddItemButton' type='button' onClick={props.onClick}>Add Item</button>
    );
}


export default AddItemButton;
