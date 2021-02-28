import React from 'react';

export default function CreateUser(props) {
    return(
        <div className="create-user-container">
        <p>List over users.
        Click <button type="button" onClick={props.onClick}>here</button> to register a new user.
      </p>
        </div>
    )
}