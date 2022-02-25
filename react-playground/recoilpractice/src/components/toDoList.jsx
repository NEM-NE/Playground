import { useState } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { toDoListState, todoListFilterState } from '../atom';
import { todoListStatsState, filteredTodoListState } from '../selector';

function ToDoList() {
    const toDoList = useRecoilValue(filteredTodoListState);

    return (
        <>
        <TodoListStats />
        <TodoListFilters />
        <ToDoItemCreator />
  
        {toDoList.map((todoItem) => (
          <ToDoItem key={todoItem.id} item={todoItem} />
        ))}
      </>
    )
}

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function ToDoItem({ item }) {
    const [todoList, setTodoList] = useRecoilState(toDoListState);
    const index = todoList.findIndex((listItem) => listItem === item);

    const editItemText = ({target: {value}}) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
          });
      
          setTodoList(newList);
    }

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete,
          });
      
          setTodoList(newList);
    }

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);

        setTodoList(newList);
    }

    return (
        <div>
          <input type="text" value={item.text} onChange={editItemText} />
          <input
            type="checkbox"
            checked={item.isComplete}
            onChange={toggleItemCompletion}
          />
          <button onClick={deleteItem}>X</button>
        </div>
      );
}

let id = 0;
function getId() {
  return id++;
}

function ToDoItemCreator() {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(toDoListState);   //setter;

    const onChange = ({target}) => {
        setInputValue(target.value);
    }

    const addItem = () => {
        setTodoList((oldList) => [
            ...oldList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            }

        ]);
        setInputValue('');
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={onChange} />
            <button onClick={addItem}>Add</button>
        </div>
    )
}

function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);
  
    const updateFilter = ({target: {value}}) => {
      setFilter(value);
    };
  
    return (
      <>
        Filter:
        <select value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
      </>
    );
  }

  function TodoListStats() {
    const {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    } = useRecoilValue(todoListStatsState);
  
    const formattedPercentCompleted = Math.round(percentCompleted * 100);
  
    return (
      <ul>
        <li>Total items: {totalNum}</li>
        <li>Items completed: {totalCompletedNum}</li>
        <li>Items not completed: {totalUncompletedNum}</li>
        <li>Percent completed: {formattedPercentCompleted}</li>
      </ul>
    );
  }


export {ToDoList};