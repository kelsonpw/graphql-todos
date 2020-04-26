/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useMutation } from 'urql';
import cx from 'classnames';

const DELETE_COMPLETED = `
  mutation {
    deleteCompleted {
      id
    }
  }
`;

export default function Filters({
  activeCount,
  completedCount,
  filter,
  setFilter,
  refreshTodos,
}) {
  const [, deleteCompleted] = useMutation(DELETE_COMPLETED);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> item{activeCount !== 1 && 's'} left
      </span>
      <ul className="filters">
        <li>
          <a
            className={cx({ selected: filter === 'all' })}
            onClick={() => {
              setFilter('all');
            }}>
            All
          </a>
        </li>
        <li>
          <a
            className={cx({ selected: filter === 'active' })}
            onClick={() => {
              setFilter('active');
            }}>
            Active
          </a>
        </li>
        <li>
          <a
            className={cx({ selected: filter === 'completed' })}
            onClick={() => {
              setFilter('completed');
            }}>
            Completed
          </a>
        </li>
      </ul>
      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={() => deleteCompleted().then(refreshTodos)}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
