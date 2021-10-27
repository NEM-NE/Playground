import React from 'react';
import { render, within, screen } from '@testing-library/react';

import ToDoList, { ToDoListProps } from '../components/ToDoList';

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

function renderToDoList(props?: Partial<ToDoListProps>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const result = render(<ToDoList list={dataAry} {...props} />);

  const list = result.getByRole('list');

  const { getAllByRole } = within(list);

  const toDoItems = () => getAllByRole('listitem');

  return {
    result,
    toDoItems,
  };
}

describe('<ToDoList />', () => {
  it('ToDoItem이 포함되어 있다.', () => {
    const { toDoItems } = renderToDoList();
    const items = toDoItems();
    const contents = items.map((item) => item.textContent);
    expect(contents).toEqual(
      [
        '이거 하기 ',
        '저거 하기 ',
        '요거 하기 ',
      ],
    );
  });
});
