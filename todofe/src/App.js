import './App.css';
import {BASE_URL} from './data.js';
import {useEffect, useState} from 'react';
import axios from 'axios';
import List from './Components/List';
import TaskForm from './Components/TaskForm';

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    axios.get(BASE_URL+'todos')
        .then(response => {
          setTodos(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  }, []);

  
  return (
    <div className="App">
      {show && <TaskForm />}
      <List todos={todos} message={message}></List>
    </div>
  );
}

export default App;
