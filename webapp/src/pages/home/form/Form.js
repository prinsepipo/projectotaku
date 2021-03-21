import './Form.css';


function Form(props) {
    return (
        <form className='Form' onSubmit={props.onSubmit}>{props.children}</form>
    );
}


export default Form;
