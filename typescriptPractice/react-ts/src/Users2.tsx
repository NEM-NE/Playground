import React from 'react';
import useAsync from './asyncHook';

const getUsers = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users',
  );

  return response.json();
};

function Users() {
  const [state, refetch] = useAsync(getUsers, []);
  const { loading, error } = state; // state.data 를 users 키워드로 조회
  const { data: users }: any = state;

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
      <button type="button" onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
