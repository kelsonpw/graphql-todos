import React, { useState } from 'react';
import { useMutation } from 'urql';

import { useAppContext } from './context';

function AddTodo() {
  const [newTodo, setNewTodo] = useState('');
  const [, addTodo] = useMutation(ADD_TODO);
  const { refreshTodos } = useAppContext();

  const addTodoMutation = () => {
    if (newTodo) {
      addTodo({ text: newTodo }).then(() => {
        setNewTodo('');
        refreshTodos();
      });
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodoMutation();
          }
        }}
        onBlur={addTodoMutation}
      />
    </header>
  );
}

const ADD_TODO = `
  mutation ($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

export default AddTodo;
