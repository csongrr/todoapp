import './App.css';
import {useState} from 'react';
import List from './Components/List';
import TaskForm from './Components/TaskForm';

function App() {

  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false); 
  const [values, setValues] = useState({
    id: '',
    title: '',
    description: '',
    deadline: '',
  });
  
  return (
    <div className="App">
      {show && <TaskForm setShow={setShow} setTodos={setTodos} todos={todos} values={values} setValues={setValues}/>}
      <List setShow={setShow} show={show} todos={todos} setTodos={setTodos} setValues={setValues}></List>
    </div>
  );
}

export default App;
