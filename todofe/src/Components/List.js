import React from 'react';

export default function List({ todos }) {
  return (
    <div className='text-center container'>
      <h2>Todo List</h2>
      <div className='header row'>
        <div className='col-2'>Név</div>
        <div className='col-2'>Leírás</div>
        <div className='col-2'>Határidő</div>
        <div className='col-2'>Állapot</div>
        <div className='col-2'></div>
      </div>
      <div>
        {todos.map(todo => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            <p>{todo.deadline}</p>
            <p>{todo.completed ? 'Kész' : 'Nyitott'}</p>
            <p className='btn-group'>
              <a className='bi bi-eye-fill btn btn-primary' title="Megtekintés"></a>
              <a className='bi bi-pencil btn btn-primary' title="Szerkesztés"></a>
              <a className='bi bi-trash btn btn-primary' title="Törlés"></a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}