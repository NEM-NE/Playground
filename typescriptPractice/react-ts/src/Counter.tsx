import React, { useReducer } from 'react';

// type Information = {
//     name: string;
//     description: string;
// }

type Action = { type: 'INCREASE' } | { type: 'DECREASE' }; // 이렇게 액션을 | 으로 연달아서 쭉 나열하세요.

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  // const [count, setCount] = useState(0); // 제네릭을 안써줘도 타입 유추 가능
  // const [info, setInfo] = useState<Information | null>(null); // 상태가 null일 수 있을 때 샤용
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button type="button" onClick={onIncrease}>+1</button>
        <button type="button" onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
