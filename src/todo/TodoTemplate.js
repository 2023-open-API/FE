import React from "react";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";
import { TodoProvider } from "./TodoContext";

const TodoTemplateBlock = styled.div`
  width: 460px;
  height: 300px;

  margin: 32px 40px 0px 40px;
  display: flex;
  flex-direction: column;
`;

const TodoHeadBlock = styled.div`
  background-color: #a7c1e1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .title {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  .todo {
    font-size: 22px;
    margin: 12px 10px;
    color: #ffffff;
    font-weight: bold;
  }

  .date {
    color: #ffffff;
    font-size: 12px;
    margin: 16px 5px;
  }
`;

function TodoTemplate() {
  const today = new Date();

  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  return (
    <TodoProvider>
      <TodoTemplateBlock>
        <TodoHeadBlock>
          <div className="title">
            <p className="todo">to-do</p>
            <p className="date">{dateString}</p>
          </div>
          <TodoCreate />
        </TodoHeadBlock>
        <TodoList />
      </TodoTemplateBlock>
    </TodoProvider>
  );
}

export default TodoTemplate;
