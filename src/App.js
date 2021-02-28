import React, { useState, useEffect} from 'react';
import './App.css';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUSer';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  //const [user, setUser] = useState();
  const baseURL = `http://localhost:8080/users`;
  //const axios = require('axios');

  useEffect(() => {
    getUsers();
    //console.log(users);
  },[]);

  async function getUsers() {
    let res = await axios.get(baseURL)
    .then((data) => setUsers(data))
    .catch((error) => console.error(error));
    console.log(users);
    //FUNKAR
  }
  
  async function postUser() {
    const newUser = {
      firstname: JSON.stringify(inputValue.fname),
      lastname: JSON.stringify(inputValue.lname),
    };

    const {firstname} = newUser;
    const {lastname} = newUser; 
    console.log(newUser, firstname, lastname);
    let res = await axios.post(baseURL, {firstname: firstname, lastname: lastname})
    .then(res => console.log(res.data))
    .then(() => getUsers())
    .catch((error) => {
      console.error(error);
    })
  }
  
  async function deleteUser(e) {
    const id = e.target.id;
    //console.log(id);
    let res = await axios.get(`${baseURL}/?_id=${id}`);
    //console.log(res.data);
    let data = res.data[0]._id;
    //console.log(data);
    const deleteThisUser = await axios.delete(`${baseURL}/${id}`);
    getUsers();
  }
  
    const getInput = (formValue) => {
      setInputValue(formValue);
    };

  return (
    <div className="App">


      <div className="user-list">
      <UserList users={users} />
      </div>

      <CreateUser />
      <div className="input-form">
      <UserForm updateParent={getInput} onSave={postUser} />
      </div>

    </div>
  );
}

export default App;
