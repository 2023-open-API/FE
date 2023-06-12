import React, {useState} from "react";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";
import { TodoProvider } from "./TodoContext";
import "react-datepicker/dist/react-datepicker.css";

const TodoTemplateBlock = styled.div`
  height: 250px;
  width: 30vw;
  margin: 3vh 3vw 0px 3vw;
  display: flex;
  flex-direction: column;
  font-family: 'Jamsil', sans-serif;
`;

const TodoHeadBlock = styled.div`
  background-color: #a7c1e1;
  display: flex;
  height:40px;
  flex-direction: row;
  justify-content: space-between;

  .title {
    display: flex;
    flex-direction: row;
    align-items: end;
  }

  .todo {
    font-size: 22px;
    margin: 12px 10px 6px;
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
  margin: 14px 5px 9.5px;

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

  const formattedDate = pickedDate.toString();

  return (
    <TodoProvider>
      <TodoTemplateBlock>
        <TodoHeadBlock>
          <div className="title">
            <p className="todo">to-do</p>
            <DateInput type="date" value={pickedDate} onChange={handleDate} />
          </div>
          <TodoCreate Date={formattedDate} />
        </TodoHeadBlock>
        <TodoList titleDate={formattedDate} />
      </TodoTemplateBlock>
    </TodoProvider>
  );
}

export default TodoTemplate;