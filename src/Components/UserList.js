import React from 'react';
import '../App.css';

export default function UserList(props) {
  const users = props.users;
  let usersHTML = users.map((user) => {
    return (
      <div className="user-container">
        <li key={user._id} id={user._id} onClick={props.onSelect} className="user-list-item">
          {user.firstname} {user.lastname}{' '}
        </li>
      </div>
    );
  });
  //console.log(users);

  return (
    <div className="items-container">
      <ul className="list-container">{usersHTML}</ul>
      <div className="userlist-btns">
        <button type="button" onClick={props.onEdit}>
          EDIT
        </button>
        <button type="button" onClick={props.onDelete}>
          DELETE
        </button>
      </div>
    </div>
  );
}
