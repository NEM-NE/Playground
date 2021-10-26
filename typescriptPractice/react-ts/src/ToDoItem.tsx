import React from 'react';
import { Todo } from './atom';

function ToDoItem({ content, id, isComplete }: Todo) {
  return (
    <ol>
      {`${id}. ${content} ${isComplete}`}
      <button type="button">완료하기</button>
    </ol>
  );
}

export default ToDoItem;
