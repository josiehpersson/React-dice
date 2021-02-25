import React from 'react';
import User from './User';
import '../App.css';

export default function UserList(props) {
    let usersHTML = props.users.map((users) => {
        return(
            <div className="user-container">
            <User key={users._id} id={users._id} name={users.name} onClick={props.onClick} />
            </div>
        )
    });

    return(
        <div className="items-container">
            <ul className="list-container">
                {usersHTML}
            </ul>
        </div>
    )
}