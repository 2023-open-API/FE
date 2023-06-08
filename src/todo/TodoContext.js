import React, { useReducer, createContext, useEffect, useContext, useRef } from 'react';

const initialTodos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

    function todoReducer(state, action) {
      switch (action.type) {
        case 'CREATE':
          const newTodo = action.todo;
          const updatedTodos = state.concat(newTodo);
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
          return updatedTodos;
        case 'TOGGLE':
          const toggledTodos = state.map((todo) =>
            todo.id === action.id ? { ...todo, done: !todo.done } : todo
          );
          localStorage.setItem('todos', JSON.stringify(toggledTodos));
          return toggledTodos;
        case 'EDIT':
          const editedTodos = state.map((todo) =>
            todo.id === action.id ? { ...todo, text: action.text, detail:action.detail } : todo
          );
          localStorage.setItem('todos', JSON.stringify(editedTodos));
          return editedTodos;
        case 'REMOVE':
          const filteredTodos = state.filter((todo) => todo.id !== action.id);
          localStorage.setItem('todos', JSON.stringify(filteredTodos));
          return filteredTodos;
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
    

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(
    Math.max(...state.map((todo) => todo.id)) + 1
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
