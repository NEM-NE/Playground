import { atom } from "recoil";

const textState = atom({
    key:'textState',
    default: '',
})

const toDoListState = atom({
    key:'toDoListState',
    default: [],
})

const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
  });

export { textState, toDoListState, todoListFilterState }