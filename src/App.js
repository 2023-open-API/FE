import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from '../src/components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import { TodoProvider } from './TodoContext';

const GlobalStyle = createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
   <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead/>
        <TodoList/>
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;

