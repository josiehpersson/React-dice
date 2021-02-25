import React from 'react';
import '../App.css';

export default function User(props) {
    return(
        <div>
            <li key={props.key}> {props.name} <button type="button" id={props.id} onClick={props.onClick}>X</button></li>
        </div>
    )
}