import React, {useState} from "react";
import { BASE_URL } from '../data';
import axios from "axios";

export default function List({ todos }) {
  const [message, setMessage] = useState(null);
  
  const deleteTask = (id) =>{
    console.log(BASE_URL+'todos/'+id);
    axios.delete(BASE_URL+'todos/'+id)
    .then(() => setMessage('Sikeres törlés'))
    .catch(error => {
      setMessage(error.message);
      console.error('Hiba történt!', error);
    });
  }

  return (
    <div className="text-center">
    <h2>Todo List</h2>
    <div>{message}</div>
    <button className="mainbutton">Új feladat hozzáadása</button>
    <div className="d-flex justify-content-center">
      <table className="table table-striped">
        <thead>
          <tr className="row">
            <th className="col-2">Név</th>
            <th className="col-3">Leírás</th>
            <th className="col-2">Határidő</th>
            <th className="col-2">Állapot</th>
            <th className="col-2"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className="align-middle row">
              <td className="col-2">{todo.title}</td>
              <td className="col-3">{todo.description}</td>
              <td className="col-2">{todo.deadline}</td>
              <td className="col-2">{todo.completed ? "Kész" : "Nyitott"}</td>
              <td className="col p-auto">
                <div className="btn-group" role="group">
                <button
                  className="btn btn-success bi bi-eye"
                  // onClick={() => setUserData(item)}
                ></button>
                <button
                  className="btn btn-warning bi bi-pencil"
                  // onClick={() => setUserData(item)}
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
