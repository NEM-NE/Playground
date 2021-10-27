import React from 'react';
import ToDoItem, { ToDoItemProps } from './ToDoItem';
/*

목적

ToDoList 컴포넌트는 사용자가 등록한 TO-Do-List를 가지고 있다.
삭제 버튼을 누르면 해당 to-do가 삭제된다.
완료 버튼을 누르면 해당 to-do가 완료되며 DB에 전달한다.

*/

const dataAry = [
  {
    id: 1,
    content: '이거 하기',
  },
  {
    id: 2,
    content: '저거 하기',
  },
  {
    id: 3,
    content: '요거 하기',
  },
];

export type ToDoListProps = {
    list: Array<ToDoItemProps>
}

function ToDoList({ list }: ToDoListProps) {
  return (
    <ul aria-labelledby="todo-heading">
      {list.map((item) => (
        <li data-testid="item" key={item.id}>
          {item.content}
          {' '}
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
