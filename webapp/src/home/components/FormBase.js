import './FormBase.css';


function FormBase(props) {
    return (
        <form className='Form-base' onSubmit={props.onSubmit}>{props.children}</form>
    );
}


export default FormBase;
