import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Inputfield from './Components/Inputfield';
import UserList from './Components/UserList';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const baseURL = `http://localhost:8080/users`;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(baseURL)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = (id) => {
    axios
    .get(`${baseURL}/${id}`)
    .then((res) => {
      setUser(res.data);
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getInput = (formValue) => {
    setInputValue(formValue);
  };

  const sendInput = () => {
    const newUser = {
      name: inputValue.toString(),
    };


    axios
      .post(baseURL, newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    getUsers();
  };

  const deleteUser = (e) => {
    const _id = e.target.id;
    console.log(_id);
    //const deleteThisUser = getUser(`?_id=${_id}`);

    axios
    .delete(`${baseURL}/:id`, {params : {_id}})
    //.delete(`${baseURL}/:id`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    console.log(`${baseURL}/:id`, {params : _id})
  };
  return (
    <div className="App">
      <Inputfield updateParent={getInput} />
      <button type="button" onClick={sendInput}>
        SEND
      </button>
      <UserList users={users} onClick={deleteUser}/>
    </div>
  );
}

export default App;
