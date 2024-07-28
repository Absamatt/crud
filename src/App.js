import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingUser, setEditingUser] = useState(null); // Добавляем состояние для редактируемого пользователя

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const newUser = { name, email, phone };
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user); // Устанавливаем редактируемого пользователя
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  const updateUser = async () => {
    try {
      const updatedUser = { ...editingUser, name, email, phone };
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, updatedUser);
      setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
      setEditingUser(null); // Сбрасываем редактируемого пользователя
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {editingUser ? (
          <button onClick={updateUser}>Update User</button>
        ) : (
          <button onClick={addUser}>Add User</button>
        )}
      </div>
      <div className='cont' >
      <ul>
        {users.map(user => (
          <div className='card'  >
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
          </div>
        ))}
      </ul>

      </div>
    </div>
  );
};

export default App;
