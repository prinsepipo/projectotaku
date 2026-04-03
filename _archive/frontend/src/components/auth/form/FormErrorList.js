import './FormErrorList.css';


function FormErrorList(props) {
    return (
        <ul className='FormErrorList'>
            {props.errors.map((error, index) => {
                return <li className='FormErrorList-item' key={index}>{error}</li>;
            })}
        </ul>
    )
}


export default FormErrorList;
