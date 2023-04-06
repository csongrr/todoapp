import './App.css';
import {BASE_URL} from './data.js';
import {useEffect, useState} from 'react';
import axios from 'axios';
import List from './Components/List';
import TaskForm from './Components/TaskForm';

function App() {

  const [todos, setTodos] = useState([]);
  // const [todo, setTodo] = useState({});
  const [show, setShow] = useState(false);
  // const [message, setMessage] = useState(null);
  
  
  return (
    <div className="App">
      {show && <TaskForm setShow={setShow} setTodos={setTodos} todos={todos}/>}
      <List setShow={setShow} todos={todos} setTodos={setTodos}></List>
    </div>
  );
}

export default App;
