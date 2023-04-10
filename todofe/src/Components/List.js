import React, { useState, useEffect } from "react";
import { BASE_URL } from '../data';
import axios from "axios";

export default function List({ setShow, show, todos, setTodos, setValues }) {
  const [message, setMessage] = useState({ visible: '', class: '', message: '', });

  const getTodos = () => {
    axios.get(BASE_URL + 'todos')
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
  const deleteTask = (id) => {

    axios.delete(BASE_URL + 'todos/' + id)
      .then(() => {
        setMessage({
          visible: true,
          class: "bg-success mesdiv",
          message: "Sikeres törlés"
        });
        getTodos();
      })
      .catch(error => {
        setMessage({
          visible: true,
          class: "bg-danger mesdiv",
          message: error.message
        });
      });
  }

  useEffect(() => {
    document.title = "ToDo App";
    getTodos();
  }, []);



  useEffect(() => {
    getTodos();
  }, [show]);


  return (
    <div className="text-center" onClick={() => clearMessage()}>
      <h1>Todo List</h1>
      {message.visible && <div className={message.class} >{message.message}</div>}
      <button className="mainbutton" onClick={() => setShow(true)}>Új feladat hozzáadása</button>
      <div className="d-flex justify-content-center">
        <table className="table  w-75">
          <thead>
            <tr className="row">
              <th className="col-md-2 col-12">Név</th>
              <th className="col-md-3 col-12">Leírás</th>
              <th className="col-md-2 col-12">Határidő</th>
              <th className="col-md-2 col-12">Állapot</th>
              <th className="col-md-3 col-12"></th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo) => todo.completed === 0)
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
              .map((todo) => (
                <tr key={todo.id} className={(new Date(todo.deadline) < new Date())? 'expired align-middle row' : 'align-middle row'}>
                  <td className="col-md-2 col-12 text-center align-items-center">{todo.title}</td>
                  <td className="col-md-3 col-12 text-center align-items-center">{todo.description}</td>
                  <td className="col-md-2 col-12 text-center align-items-center">{todo.deadline}</td>
                  <td className="col-md-2 col-12 text-center align-items-center">{todo.completed ? 'Kész' : 'Nyitott'}</td>
                  <td className="col-md-3 col-12 m-auto">
                    <div className="btn-group" role="group">
                      <button title="Teljesítve" className="btn btn-success bi bi-check-lg" onClick={() => {
                        if (window.confirm('Biztos lezárja a feladatot?')) {
                          axios.post(BASE_URL + 'todo/' + todo.id, { completed: true })
                            .then(() => getTodos())
                            .catch((error) => console.log(error));
                        }
                      }}></button>
                      <button title="Szerkesztés" className="btn btn-warning bi bi-pencil" onClick={() => {
                        setShow(true);
                        setValues({
                          id: todo.id, title: todo.title, description: todo.description, deadline: todo.deadline,
                        });
                      }}></button>
                      <button
                        title="Törlés"
                        className="btn btn-danger bi bi-trash3"
                        onClick={() => {
                          if (window.confirm('Biztos törli a feladatot?')) {
                            deleteTask(todo.id);
                          }
                        }}
                      ></button>
                    </div>
                  </td>
                </tr>
              ))}
            {todos
              .filter((todo) => todo.completed !== 0)
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
              .map((todo) => (
                <tr key={todo.id} className='align-middle row succestask'>
                  <td className="col-md-2 col-12">{todo.title}</td>
                  <td className="col-md-3 col-12">{todo.description}</td>
                  <td className="col-md-2 col-12">{todo.deadline}</td>
                  <td className="col-md-2 col-12">{todo.completed ? 'Kész' : 'Nyitott'}</td>
                  <td className="col-md-3 col-12 p-auto">
                    <div className="btn-group" role="group">
                      <button
                        title="Törlés"
                        className="btn btn-danger bi bi-trash3"
                        onClick={() => {
                          if (window.confirm('Biztos törli a feladatot?')) {
                            deleteTask(todo.id);
                          }
                        }}
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
