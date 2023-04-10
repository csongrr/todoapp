import React, { useState } from 'react';
import { BASE_URL } from '../data';
import axios from 'axios';

const TaskForm = ({ setShow, values, setValues }) => {

  const [message, setMessage] = useState({ visible: false, class: '', message: [], });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  function clearMessage() {
    setMessage({ visible: false, class: "", message: "" });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.id){
      axios.post(BASE_URL + 'todos/'+values.id, {
        title: values.title,
        description: values.description,
        deadline: values.deadline,
      })
        .then(function (response) {
          setMessage({
            visible: true,
            class: "bg-success mesdiv",
            message: {status: "Sikeresen módosította a feladatot!"}
          });
        })
        .catch(function (error) {
          setMessage({ visible: true, class: "bg-danger mesdiv", message: error.response.data });
          console.log(error.response.data)
        })
    }else{
    axios.post(BASE_URL + 'addtask', {
      id: values.id,
      title: values.title,
      description: values.description,
      deadline: values.deadline,
    })
      .then(function (response) {
        setMessage({
          visible: true,
          class: "bg-success mesdiv",
          message: {status: "Sikeresen feladat felvétel!"}
        });
      })
      .catch(function (error) {
        setMessage({ visible: true, class: "bg-danger mesdiv", message: error.response.data });
        console.log(error.response.data)
      })
  };
}


  return (
    <div className='taskform' onClick={() => clearMessage()}>
      <form>
        {message.visible && (
          <div className={message.class}>
            {Array.isArray(message.message)
              ? Object.values(message.message).map((array, index) => (
                array.map((element, index) => (
                  <p key={index}>{element}</p>
                ))
              ))
              : Object.values(message.message).map((message, index) => (
                <p key={index}>{message}</p>
              ))
            }
          </div>
        )}
        <label>
          <input type="hidden" name="id" value={values.id} />
          <span>Cím:</span>
          <input type="text" name="title" value={values.title} onChange={handleChange} required />
        </label>
        <label>
          <span>Leírás:</span>
          <textarea type="text" name="description" value={values.description} onChange={handleChange} required></textarea>
        </label>
        <label>
          <span>Tervezett időpont</span>
          <input className="datepicker" type="date" name="deadline" value={values.deadline} onChange={handleChange} required />
        </label>
        <div className='row'>
          <button className="col-3" onClick={handleSubmit}>Hozzáadás</button>
          <button className="btn btn-danger bi bi-x col-3" onClick={() => setShow(false) & setValues({ id: null, title: '', description: '', deadline: '' })}></button>
        </div>
      </form >
    </div >
  );
}
export default TaskForm;