import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const ToggleButton = styled.div`
  color: #dee2e6;
  &:hover {
    color: #343a40;
  }
  &:active {
    color: #343a40;
  }
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 30px;

  ${props =>
    props.open &&
    css`
      color: #343a40;
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

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const openModal = () => {
    setOpen(!open);
  };

  const closeModal = () => {
    setOpen(false);
    setValue('');
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const addTodo = () => {
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      <ToggleButton onClick={openModal} open={open}>+</ToggleButton>

      {open && (
        <InsertFormPositioner>
            <Close onClick={closeModal}>&times;</Close>
            <Input type="text" value={value} onChange={handleInputChange} />
            <AddButton onClick={addTodo}>추가</AddButton>
        </InsertFormPositioner>
      )}
    </>
  );
}

export default React.memo(TodoCreate);