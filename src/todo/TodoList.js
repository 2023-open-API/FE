import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "./TodoContext";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 16px 32px;
  overflow-y: auto;
  background-color: white;
`;

function TodoList() {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          detail={todo.detail}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
