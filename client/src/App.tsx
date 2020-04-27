import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from 'urql';

import AddTodo from './AddTodo';
import Footer from './Footer';
import Filters from './Filters';
import TodoList from './TodoList';

import { AppProvider } from './context';

import { Todo, Filter } from './types';

function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const [{ data }, executeGetTodos] = useQuery({
    query: GET_TODOS,
  });
  const refreshTodos = useCallback((): void => {
    executeGetTodos({ requestPolicy: 'network-only' });
  }, [executeGetTodos]);
  const todos: Todo[] = data?.getTodos || [];
  const filteredTodos: Todo[] = useMemo(() => filterTodos(todos, filter), [
    todos,
    filter,
  ]);
  return (
    <AppProvider value={{ refreshTodos }}>
      <section className="todoapp">
        <AddTodo />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Filters
              activeCount={filterTodos(filteredTodos, 'active').length}
              completedCount={filterTodos(filteredTodos, 'completed').length}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </section>
      <Footer />
    </AppProvider>
  );
}

const GET_TODOS = `
  query { 
    getTodos {
      id
      text
      complete
    }
  }
`;

const filterTodos = (todos: Todo[], filter: Filter) => {
  if (filter === 'active') {
    return todos.filter(({ complete }) => !complete);
  }
  if (filter === 'completed') {
    return todos.filter(({ complete }) => complete);
  }
  return todos;
};

export default App;
