import React, {useState, useEffect} from "react";
import { BASE_URL } from '../data';
import axios from "axios";

export default function List({setShow, show}) {
  const [message, setMessage] = useState({visible: '',class: '', message: '',});
  const [todos, setTodos] = useState([]);
  
  
  const getTodos = ()=> {
    axios.get(BASE_URL+'todos')
    .then(response => {
      setTodos(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function clearMessage() {
    setMessage({ visible: false, class: "", message: "" });
  }
  const deleteTask = (id) =>{

    axios.delete(BASE_URL+'todos/'+id)
    .then(() => {
      setMessage({
        visible: true,
        class: "bg-success mesdiv",
        message:  "Sikeres törlés"});
        getTodos();
      })
    .catch(error => {
      setMessage({
        visible: true,
        class: "bg-danger mesdiv",
        message:  error.message});
    });
  }

    useEffect(() => {
      getTodos();
  }, []);


  return (
    <div className="text-center" onClick={() => clearMessage()}>
    <h2>Todo List</h2>
    {message.visible && <div className={message.class} >{message.message}</div>}
    <button className="mainbutton" onClick={() => setShow(true)}>Új feladat hozzáadása</button>
    <div className="d-flex justify-content-center">
      <table className="table table-striped w-75">
        <thead>
          <tr className="row">
            <th className="col-3">Név</th>
            <th className="col-3">Leírás</th>
            <th className="col-2">Határidő</th>
            <th className="col-2">Állapot</th>
            <th className="col-2"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className="align-middle row">
              <td className="col-3">{todo.title}</td>
              <td className="col-3">{todo.description}</td>
              <td className="col-2">{todo.deadline}</td>
              <td className="col-2">{todo.completed ? "Kész" : "Nyitott"}</td>
              <td className="col-2 p-auto">
                <div className="btn-group" role="group">
                <button
                  className="btn btn-success bi bi-eye"
                  // onClick={() => }
                ></button>
                <button
                  className="btn btn-warning bi bi-pencil"
                  // onClick={() => }
                ></button>
                <button
                  className="btn btn-danger bi bi-trash3"
                  onClick={() => deleteTask(todo.id)}
                ></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
