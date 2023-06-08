import React from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { TodoProvider } from './TodoContext';

const TodoTemplateBlock = styled.div`
  width: 750px;
  height: 550px;
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const TodoHeadBlock = styled.div`
  background-color: #A7C1E1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .title{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  .todo {
    font-size: 30px;
    margin: 20px 10px;
    color: #FFFFFF;
    font-weight: bold;
  }

  .date {
    color: #FFFFFF;
    font-size: 17px;
    margin: 24px 2px;
  }
`;

function TodoTemplate() {

const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
  });


return  (
      <TodoProvider>
        <TodoTemplateBlock>
          <TodoHeadBlock>
            <div className='title'>
              <p className="todo">to-do</p>
              <p className='date'>{dateString}</p>
            </div>
            <TodoCreate/>
          </TodoHeadBlock>
          <TodoList/>
        </TodoTemplateBlock>
      </TodoProvider>
      );  
}

export default TodoTemplate;