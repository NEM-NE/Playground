import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Todo, todoStore } from './atom';

function InputBar() {
  const [value, setValue] = useState('');
  const [toDoList, setToDoList] = useRecoilState(todoStore);
  const handleClick = () => {
    const obj = {
      id: toDoList.length + 1,
      content: value,
      isComplete: false,
    } as Todo;

    const newList = [
      ...toDoList,
      obj,
    ] as Todo[];
    setToDoList(newList);
    setValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { value }: {value: string} = e.currentTarget;
    setValue(value);
  };

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <button type="button" onClick={handleClick}> 등록하기 </button>
    </>
  );
}

export default InputBar;
