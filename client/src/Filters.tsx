/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useMutation } from 'urql';
import cx from 'classnames';

import { useAppContext } from './context';

import { Filter } from './types';

type FiltersProps = {
  activeCount: number;
  completedCount: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

function Filters({
  activeCount,
  completedCount,
  filter,
  setFilter,
}: FiltersProps) {
  const [, deleteCompleted] = useMutation(DELETE_COMPLETED);
  const { refreshTodos } = useAppContext();
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

const DELETE_COMPLETED = `
  mutation {
    deleteCompleted {
      id
    }
  }
`;

export default Filters;
