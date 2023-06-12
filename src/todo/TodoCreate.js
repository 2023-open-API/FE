import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoNextId } from './TodoContext';

const ToggleButton = styled.div`
  color: #ffffff;
  cursor: pointer;
  margin-top: 9px;
  width: 40px;
  height: 40px;
  font-size: 30px;
`;

const InsertFormPositioner = styled.div`
  width: 380px;
  height: 250px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 19px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ced4da;

  
  .btnbundle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 25px;
  }

  .todotitle{
    font-weight: 600;
    margin: 10px 25px;
  }

`;

const Close = styled.div`
background: #84A1C4;
border-radius: 7px;
cursor: pointer;
width: 55px;
height: 21px;
padding: 2px 0;
font-weight: 600;
text-align: center;
font-size: 13px;
color: white;
`;

const AddButton = styled.div`
  background: #84A1C4;
  border-radius: 7px;
  cursor: pointer;
  width: 55px;
  height: 21px;
  padding: 2px 0;
  font-weight: 600;
  text-align: center;
  font-size: 13px;
  color: white;
`;

const Input1 = styled.input`
  border: none;
  border-bottom: 1px solid #607B9B;
  width: 330px;
  margin: 5px 25px 10px 25px;
  outline: none;
  font-size: 13px;
  padding-bottom: 5px;
  box-sizing: border-box;
`;

const Input2 = styled.textarea`
  border: 1px solid #607B9B;
  width: 330px;
  height: 130px;
  margin: auto;
  outline: none;
  resize: none;
  font-size: 13px;
  box-sizing: border-box;
`;

function TodoCreate({Date}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [detail, setDetail] = useState('');
  const modalRef = useRef(null);

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const openModal = () => {
    setOpen(!open);
  };

  const closeModal = () => {
    setOpen(false);
    setValue('');
    setDetail('');
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const addTodo = () => {

    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        detail: detail,
        done: false,
        date: Date,
      }
    });
    setValue('');
    setDetail('');
    setOpen(false);
    nextId.current += 1;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <ToggleButton onClick={openModal} open={open}>+</ToggleButton>

      {open && (
        <InsertFormPositioner ref={modalRef}>
            <p className='todotitle'>to do</p>
            <Input1 type="text" placeholder='to do를 입력하세요' value={value} onChange={handleInputChange} />
            <Input2 value={detail} onChange={handleDetailChange} />
            <div className='btnbundle'> 
            <Close onClick={closeModal}>취소</Close>
            <AddButton onClick={addTodo}>추가</AddButton>
            </div>
        </InsertFormPositioner>
      )}
    </>
  );
}

export default React.memo(TodoCreate);