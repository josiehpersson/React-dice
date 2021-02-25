import React, {useState} from 'react';
import '../App.css';


export default function Inputfield(props) {
    const [formValue, setFormValue] = useState('');

    const updateForm = (e) => {
        const userInput = e.target.value;
        setFormValue(userInput);
        //setFormValue(() => userInput);
        //console.log(userInput); uppdaterar som den ska
        //console.log(formValue); ligger 1 efter
        props.updateParent(formValue);
    }
    return(
        <div className="input-container">
            <input 
            type="text"
            name="textInput"
            id="textInput"
            className="input-field"
            value={formValue.value}
            onChange={updateForm}
            />
        </div>
    )
}