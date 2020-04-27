import React, { useState } from 'react';
import { useMutation } from 'urql';

import Todo from './Todo';

import { Todo as TodoType } from './types';

type TodoListProps = {
  todos: TodoType[];
};

function TodoList({ todos }: TodoListProps) {
  const [editing, setEditing] = useState('');
  const [toggle, setToggle] = useState(false);
  const [, toggleAllTodos] = useMutation(TOGGLE_ALL_TODOS);
  return (
    <>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={toggle}
          onChange={() => {
            toggleAllTodos({ complete: !toggle }).then(() => {
              setToggle((t) => !t);
            });
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </section>
      <ul className="todo-list">
        {todos.map(({ id, text, complete }) => (
          <Todo
            key={id}
            id={id}
            text={text}
            complete={complete}
            editing={editing === id}
            setEditing={setEditing}
          />
        ))}
      </ul>
    </>
  );
}

const TOGGLE_ALL_TODOS = `
  mutation($complete: Boolean!) {
    toggleAllTodos(complete: $complete) {
      id
    }
  }
`;

export default TodoList;
