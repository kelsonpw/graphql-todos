import React, { useState, useMemo } from 'react';
import { useQuery } from 'urql';

import AddTodo from './AddTodo';
import Footer from './Footer';
import Filters from './Filters';
import TodoList from './TodoList';

const GET_TODOS = `
  query { 
    getTodos {
      id
      text
      complete
    }
  }
`;

export default function App() {
  const [filter, setFilter] = useState('all');
  const [{ data }, executeGetTodos] = useQuery({
    query: GET_TODOS,
  });
  const todos = data?.getTodos || [];
  const refreshTodos = () => {
    executeGetTodos({ requestPolicy: 'network-only' });
  };
  const filteredTodos = useMemo(() => filterTodos(todos, filter), [
    todos,
    filter,
  ]);
  return (
    <>
      <section className="todoapp">
        <AddTodo refreshTodos={refreshTodos} />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} refreshTodos={refreshTodos} />
            <Filters
              activeCount={filterTodos(filteredTodos, 'active').length}
              completedCount={filterTodos(filteredTodos, 'completed').length}
              filter={filter}
              setFilter={setFilter}
              refreshTodos={refreshTodos}
            />
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

const filterTodos = (todos, filter) => {
  if (filter === 'active') {
    return todos.filter(({ complete }) => !complete);
  }
  if (filter === 'completed') {
    return todos.filter(({ complete }) => complete);
  }
  return todos;
};
