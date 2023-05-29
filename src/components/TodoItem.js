import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #343a40;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const InsertFormPositioner = styled.div`
  width: 380px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f8f9fa;
  border-radius: 16px;
  border: 1px solid #e9ecef;
`;

const Close = styled.div`
  color: #dee2e6;
  &:hover {
    color: #343a40;
  }
  &:active {
    color: #343a40;
  }

  margin-left: 340px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 30px;
  border: none;
  outline: none;
`;

const AddButton = styled.div`
  background: #dee2e6;
  &:hover {
    background: #343a40;
  }
  &:active {
    background: #343a40;
  }

  cursor: pointer;
  width: 70px;
  height: 40px;
  text-align: center;
  font-size: 30px;
  color: white;
  border-radius: 13%;
  border: none;
  outline: none;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 260px;
  margin: auto;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoItem({ id, done, text }) {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const dispatch = useTodoDispatch();

  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });

  const handleEditClick = () => {
    setEditing(true);
  };
  
  const handleEditChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleEditSubmit = () => {
    if (editedText.trim() === '') {
      // 입력값이 비어있으면 수정 취소
      setEditing(false);
      return;
    }

    dispatch({
      type: 'EDIT',
        id: id,
        text: editedText,
    });
    setEditing(false);
};

const handleEditCancel = () => {
  setEditedText(text);
  setEditing(false);
};

return (
  <TodoItemBlock>
      
    <CheckCircle done={done} onClick={onToggle}>
      {done && <MdDone/>}
    </CheckCircle>

    <Text done={done} onClick={handleEditClick}>{text}</Text>

    {/* 수정 폼 */}
    {isEditing && (
      <InsertFormPositioner>
        <Close onClick={handleEditCancel}>&times;</Close>
        <Input type="text" value={editedText} onChange={handleEditChange} />
        <AddButton onClick={handleEditSubmit}>수정</AddButton>
      </InsertFormPositioner>
    )}  

    <Remove onClick={onRemove}>
      <MdDelete/>
    </Remove>

  </TodoItemBlock>
);
}

export default React.memo(TodoItem);