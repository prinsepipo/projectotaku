import './FormError.css';


function FormError(props) {
    return (
        <ul className='Form-error-list'>
            {props.errors.map((error, index) => {
                return <li className='Form-error-listitem' key={index}>{error}</li>;
            })}
        </ul>
    )
}


export default FormError;
