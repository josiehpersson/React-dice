import React from 'react';
import '../App.css';

export default function UserList(props) {
    let usersHTML = props.users.map((user) => {
        return(
            <div className="user-container">
            <li key={user._id} id={user._id}>{user.firstName} {user.lastName} </li>
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