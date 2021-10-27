import React from 'react';

export type InputBarsProps = {
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/*

목적

InputBars 컴포넌트는 사용자가 상호작용할 수 있는 간단한 Form 요소를 렌더링 한다.
이 Form은 사용자가 해야할 일을 적고 저장하는 방식으로 동작한다.
사용자는 Form을 작성한 후 적용 또는 취소를 클릭할 수 있다. App.tsx에서 볼 수 있듯이 두 버튼 모두 InputBars으로 전달되는 콜백 함수를 실행한다.
사용자가 제출을 클릭하면 Form 요소를 string값으로 하여 onSubmit 콜백 함수에 전달한다.

*/

function InputBars({ onSubmit }:InputBarsProps) {
  return (
    <>
      해야 할 일
      {' '}
      <input type="text" />
      <button type="button" onClick={onSubmit}> 추가하기 </button>
    </>
  );
}

export default InputBars;
