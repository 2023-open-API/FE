import React, {useState} from "react";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";
import { TodoProvider } from "./TodoContext";
import "react-datepicker/dist/react-datepicker.css";

const TodoTemplateBlock = styled.div`
  width: 320px;
  height: 230px;

  margin: 32px 40px 0px 40px;
  display: flex;
  flex-direction: column;
  font-family: 'Jamsil', sans-serif;
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
`;

const DateInput = styled.input`
  background-color: #a7c1e1;
  border:none;
  color: white;
  font-family: 'Jamsil', sans-serif;
  font-size: 12px;
  outline: none;
  margin: 14px 5px;

  &:hover {
    border: none;
    background-color: #a7c1e1;
    outline: none;
    color: white;
  }

  &:active {
    background-color: #a7c1e1;
    border: none;
    outline: none;
    color: white;
  }

  &:after{
    background-color: #a7c1e1;
    border: none;
    outline: none;
    color: white;
  }

  &:before{
    background-color: #a7c1e1;
    border: none;
    outline: none;
    color: white;
  }

  ::-webkit-calendar-picker-indicator{
    filter: invert(1);
    cursor: pointer;
  }
`;

function TodoTemplate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const initialDate = `${year}-${month}-${day}`;
  const [pickedDate, setPickedDate] = useState(initialDate);

  const handleDate = (event) => {
    setPickedDate(event.target.value);
  };

  return (
    <TodoProvider>
      <TodoTemplateBlock>
        <TodoHeadBlock>
          <div className="title">
            <p className="todo">to-do</p>
            <DateInput type="date" value={pickedDate} onChange={handleDate} />
          </div>
          <TodoCreate />
        </TodoHeadBlock>
        <TodoList />
      </TodoTemplateBlock>
    </TodoProvider>
  );
}

export default TodoTemplate;
