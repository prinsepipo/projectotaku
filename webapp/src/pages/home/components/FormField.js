import './FormField.css';


function FormField(props) {
    return (
        <input
          className='Form-field'
          type={props.type}
          placeholder={props.fieldname}
          onChange={props.onChange}
        />
    );
}


export default FormField;
