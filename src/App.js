import React, { useState, useEffect} from 'react';
import './App.css';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUSer';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const baseURL = `http://localhost:8080/users`;

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () => {
    let findUsers = await axios.get(baseURL)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => console.error(error));
  }
  
  const postUser = () => {
    const newUser = {
      firstname: inputValue.fname,
      lastname: inputValue.lname,
    };
    const {firstname} = newUser;
    const {lastname} = newUser; 
    axios.post(baseURL, {firstname: firstname, lastname: lastname})
    .then(res => console.log(res.data))
    .then(() => getUsers())
    .catch((error) => {
      console.error(error);
    })
  }

  const getUserId = (e) => {
    const id = e.target.id;
    const liElement = e.target;
    selectUser(liElement);
    axios.get(`${baseURL}/?_id=${id}`)
    .then(res=> setUserId(res.data[0]._id))
    .catch((error) => {
      console.log(error);
    })
  }
  
  const editUser = () => {
    const editedUser = {
      firstname: inputValue.fname,
      lastname: inputValue.lname,
    }

    axios.put(`${baseURL}/${userId}`, {_id: userId, firstname: editedUser.firstname, lastname: editedUser.lastname })
    .then(res => console.log(res.data))
    .then(() => getUsers())
    .then(() => setUserId('0'))
    .catch((error) => {
      console.log(error);
    })
  } 
  
   const deleteUser = () => {
    axios.delete(`${baseURL}/${userId}`)
    .then(res => console.log(res.data))
    .then(() => getUsers())
    .then(() => setUserId('0') )
    .catch((error) => {
      console.log(error);
    })
  } 

  const onSaveClick = () => {
    if(userId === '0') {
      postUser();
    } else {
      editUser();
    }
  }

  const selectUser = (user) => {
    if(user.classList.contains('selected-user')){
      user.classList.remove('selected-user');
    } else {
      user.classList.add('selected-user')
    }
  }
  
    const getInput = (formValue) => {
      setInputValue(formValue);
    };

  return (
    <div className="App">
      <div className="user-list">
      <UserList 
      users={users}
      onSelect={getUserId}
      onEdit={editUser}
      onDelete={deleteUser}
      />

      </div>

      <CreateUser />
      <div className="input-form">
      <UserForm updateParent={getInput} onSave={onSaveClick} />
      </div>

    </div>
  );
}

export default App;
