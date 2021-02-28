import React, {useState} from 'react';
import '../App.css';


export default function UserForm(props) {
    const defaultFormValue = {
        fname: '',
        lname: '',
    }
    const [formValue, setFormValue] = useState(defaultFormValue);

    const updateForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({...formValue, [name]: value});
        //console.log(formValue); 
        props.updateParent(formValue);
    }
    return(
        <div className="input-container">
            <input 
            type="text"
            name="fname"
            id="fname"
            className="input-field"
            placeholder="First name"
            value={formValue.fname}
            onChange={updateForm}
            />
            <input 
            type="text"
            name="lname"
            id="lname"
            className="input-field"
            placeholder="Last name"
            value={formValue.lname}
            onChange={updateForm}
            />
                  <div className="input-btns">
      <button type="button" onClick={props.onSave}>
        SAVE
      </button>
      <button type="button" onClick={props.onCancel}>
        CANCEL
      </button>
      </div>
        </div>
    )
}