import { atom } from 'recoil';

export interface Todo {
    id: number;
    content: string;
    isComplete: boolean;
  }

export const todoStore = atom<Todo[]>({
  key: 'todo',
  default: [
    { id: 1, content: '운동하기', isComplete: false },
    { id: 2, content: '개발하기', isComplete: false },
    { id: 3, content: '공부하기', isComplete: false },
    { id: 4, content: '티비보기', isComplete: false },
  ],
});
