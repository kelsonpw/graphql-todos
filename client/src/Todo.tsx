import React from 'react';
import { useMutation } from 'urql';
import cx from 'classnames';

import { useAppContext } from './context';

type TodoProps = {
  id: string;
  text: string;
  complete: boolean;
  editing: boolean;
  setEditing: (editing: string) => void;
};

function Todo({ id, text, complete, editing, setEditing }: TodoProps) {
  const [, deleteTodo] = useMutation(DELETE_TODO);
  const [, updateTodo] = useMutation(UPDATE_TODO);
  const { refreshTodos } = useAppContext();
  const updateTodoText = (value: string) => {
    if (value) {
      updateTodo({ id, text: value }).then(() => {
        setEditing('');
      });
    }
  };

  return (
    <li className={cx({ completed: complete, editing })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={complete}
          onChange={() => {
            updateTodo({ id, complete: !complete });
          }}
        />
        <label onDoubleClick={() => setEditing(id)}>{text}</label>
        <button
          className="destroy"
          onClick={() => {
            deleteTodo({ id }).then(refreshTodos);
          }}
        />
      </div>
      <input
        className="edit"
        defaultValue={text}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateTodoText((e.target as HTMLInputElement).value);
          }
        }}
        onBlur={(e) => updateTodoText((e.target as HTMLInputElement).value)}
      />
    </li>
  );
}

const DELETE_TODO = `
  mutation($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const UPDATE_TODO = `
  mutation($id: ID!, $text: String, $complete: Boolean) {
    editTodo(id: $id, text: $text, complete: $complete) {
      id
    }
  }
`;

export default Todo;
