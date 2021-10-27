import React from 'react';

export type ToDoItemProps = {
    id: number,
    content: string,
}

/*

목적

ToDoList 컴포넌트는 사용자가 등록한 TO-Do-List를 가지고 있다.
삭제 버튼을 누르면 해당 to-do가 삭제된다.
완료 버튼을 누르면 해당 to-do가 완료되며 DB에 전달한다.

*/

function ToDoItem({ id, content }:ToDoItemProps) {
  const deleteHandler = () => {};
  const completeHandler = () => {};
  return (
    <li data-testid="item" key={id}>
      <span>{content}</span>
      <button type="button" onClick={deleteHandler}> 삭제 </button>
      <button type="button" onClick={completeHandler}> 완료 </button>
    </li>
  );
}

export default ToDoItem;
