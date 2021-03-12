import './FormButton.css';


function FormButton(props) {
    return (
        <button
          className={'Form-button Form-button--' + props.classType}
          type={props.buttonType}
          onClick={props.onClick}
        >
        {props.text}
        </button>
    );
}


export default FormButton;
