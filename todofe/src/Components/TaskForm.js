import React, { useState } from 'react';
import { BASE_URL } from '../data';
import axios from 'axios';

const TaskForm = ({show, setShow, setTodos, todos}) => {

  const [values, setValues] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const [message, setMessage] = useState({visible: '',class: '', message: '',});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  function HideAndGet(){
    setShow(false);

    axios.get(BASE_URL+'todos')
    .then(response => {
      setTodos(response.data);
      console.log(todos);
    })
    .catch(error => {
      console.error(error);
      
    });
  
  }
  function clearMessage() {
    setMessage({ visible: false, class: "", message: "" });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(BASE_URL+'addtask', {
      title: values.title,
      description: values.description,
      deadline: values.deadline,
    })
    .then(function (response) {
      setMessage({
      visible: true,
      class: "bg-success mesdiv",
      message:  "Sikeresen feladat felvétel!"});
    })
    .catch(function (error) {
      setMessage({ visible: true, class: "bg-danger mesdiv",message: error.response.data});
    });
    setValues({ title: '', description: '', deadline: '' });
  };


  return (
    <div className='taskform' onClick={() => clearMessage()}>
    <form>
      {message && <div className={message.class}  onClick={() => clearMessage()}>{message.message}</div>}
      <label>
        <span>Cím:</span>
        <input type="text" name="title" value={values.title} onChange={handleChange} />
      </label>
      <label>
        <span>Leírás:</span>
        <textarea type="text" name="description" value={values.description} onChange={handleChange}></textarea>
      </label>
      <label>
        <span>Tervezett időpont</span>
        <input className="datepicker" type="date" name="deadline" value={values.deadline} onChange={handleChange} />
      </label>
      <div className='row'>
      <button className="col-3" onClick={handleSubmit}>Hozzáadás</button>
      <button className="btn btn-danger bi bi-x col-3" onClick={() => HideAndGet()}></button>
      </div>
    </form>
    </div>
  );
}
export default TaskForm;