import React, { useEffect, useReducer } from 'react';

interface State {
    loading?: boolean;
    data?: any | null;
    error?: any | null;
}

interface Action extends State{
    type: string;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const result = await response.json();
      dispatch({ type: 'SUCCESS', data: result });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.username}
            {' '}
            (
            {user.name}
            )
          </li>
        ))}
      </ul>
      <button type="button" onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
