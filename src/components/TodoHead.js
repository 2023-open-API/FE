import React from 'react';
import styled from 'styled-components';
import TodoCreate from './TodoCreate';

const TodoHeadBlock = styled.div`
  padding-top: 15px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom : 15px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content:space-between;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
`;

function TodoHead() {
  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
        <div className='container'>
          <h1>{dateString}</h1>
          <p className="day">{dayName}</p>
        </div>
        <TodoCreate/>
    </TodoHeadBlock>
  );
}

export default TodoHead;