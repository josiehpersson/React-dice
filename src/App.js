import React, { useState, useEffect} from 'react';
import './App.css';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUSer';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  //const [user, setUser] = useState();
  const baseURL = `http://localhost:8080/users`;
  //const axios = require('axios');

  useEffect(() => {
    getUsers();
    //console.log(users);
  },[]);

  async function getUsers() {
    let finsUsers = await axios.get(baseURL)
    .then((res) => {
      console.log(res.data)
      setUsers(res.data);
    })
    .catch((error) => console.error(error));
    //FUNKAR
  }
  
  function postUser() {
    const newUser = {
      firstname: inputValue.fname,
      lastname: inputValue.lname,
    };

    const {firstname} = newUser;
    const {lastname} = newUser; 
    //console.log(newUser, firstname, lastname);
    axios.post(baseURL, {firstname: firstname, lastname: lastname})
    .then(res => console.log(res.data))
    .then(() => getUsers())
    .catch((error) => {
      console.error(error);
    })
  }

  function getUserId(e) {
    const id = e.target.id;
    axios.get(`${baseURL}/?_id=${id}`)
    .then(res=> setUserId(res.data._id))
    .catch((error) => {
      console.log(error);
    })
    console.log(userId);
  }
  
  function deleteUser(id) {
    console.log(`removed user with id: ${userId}`)
  }
/*   function deleteUser(id) {
    axios.delete(`${baseURL}/${id}`)
    .then(res => console.log(res.data))
    .then(() => getUsers())
    .catch((error) => {
      console.log(error);
    })
  } */
  
    const getInput = (formValue) => {
      setInputValue(formValue);
    };

  return (
    <div className="App">


      <div className="user-list">
      <UserList 
      users={users}
      onSelect={getUserId}
      />
      <div className="userlist-btns">
      <button type="button">EDIT</button>
      <button type="button" onClick={deleteUser(userId)}>DELETE</button>
      </div>
      </div>

      <CreateUser />
      <div className="input-form">
      <UserForm updateParent={getInput} onSave={postUser} />
      </div>

    </div>
  );
}

export default App;
