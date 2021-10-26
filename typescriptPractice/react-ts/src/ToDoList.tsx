import React from 'react';
import { useRecoilState } from 'recoil';

import { todoStore } from './atom';
import ToDoItem from './ToDoItem';

function ToDoList() {
  const [toDoList] = useRecoilState(todoStore);

  return (

    <>
      {/* eslint-disable-next-line max-len */}
      {toDoList.map((item) => <ToDoItem content={item.content} id={item.id} isComplete={item.isComplete} />)}
    </>
  );
}

export default ToDoList;
