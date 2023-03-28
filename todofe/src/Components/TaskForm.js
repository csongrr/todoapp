import React, { useState } from 'react';
import { BASE_URL } from '../data';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(BASE_URL+'addtask', {
      title: values.title,
      description: values.description,
      deadline: values.deadline,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
    setValues({ title: '', description: '', deadline: '' });
  };
  return (
    <div className='taskform'>
    <form onSubmit={handleSubmit}>
      <label>
        <span>Title:{values.title+ '-' +BASE_URL+'addtask'}</span>
        <input type="text" name="title" value={values.title} onChange={handleChange} />
      </label>
      <label>
        <span>Description:{values.description}</span>
        <textarea name="description" value={values.description} onChange={handleChange}></textarea>
      </label>
      <label>
        <span>Tervezett időpont{values.deadline}</span>
        <input type="date" name="deadline" value={values.deadline} onChange={handleChange} />
      </label>
      <button type="submit" onClick={handleSubmit}>Hozzáadás</button>
    </form>
    </div>
  );
}
export default TaskForm;