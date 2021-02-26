import React, { useState, useEffect} from 'react';
import './App.css';
//import axios from 'axios';
import Inputfield from './Components/Inputfield';
import UserList from './Components/UserList';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  //const [user, setUser] = useState();
  const baseURL = `http://localhost:8080/users`;
  const axios = require('axios');

  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    let res = await axios.get(baseURL);
    setUsers(res.data);
    //console.log(users);
  }

  const getInput = (formValue) => {
    setInputValue(formValue);
  };

  async function postInput() {
    const newUser = {
      name: inputValue.toString(),
    };

    let res = await axios.post(baseURL, newUser);
    let data = res.data;
    console.log(data);
    getUsers();
  }

async function deleteUser(e) {
  const id = e.target.id;
  //console.log(id);
  let res = await axios.get(`${baseURL}/?_id=${id}`);
  console.log(res.data);
  let data = res.data[0]._id;
  //console.log(data);
  const deleteThisUser = await axios.delete(`${baseURL}/${id}`);
  getUsers();
}


  return (
    <div className="App">
      <Inputfield updateParent={getInput} />
      <button type="button" onClick={postInput}>
        SEND
      </button>
      <UserList users={users} onClick={deleteUser}/>
    </div>
  );
}

export default App;
