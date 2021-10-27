import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import InputBars, { InputBarsProps } from '../components/InputBars';

function renderInputBars(props?: Partial<InputBarsProps>) {
  const onSubmit = jest.fn();

  // eslint-disable-next-line react/jsx-props-no-spreading
  const result = render(<InputBars onSubmit={onSubmit} {...props} />);

  const inputBar = () => result.container.querySelector('input') as HTMLInputElement;
  const submitBtn = () => result.container.querySelector('button') as HTMLButtonElement;

  function changeInputBar(data: string) {
    fireEvent.change(inputBar(), { target: { value: data } });
  }

  function clickSubmit() {
    fireEvent.click(submitBtn());
  }

  return {
    onSubmit,
    result,
    inputBar,
    submitBtn,
    changeInputBar,
    clickSubmit,
  };
}

describe('<InputBars />', () => {
  it('모든 필드들이 렌더링 되어야 한다.', () => {
    const { inputBar, submitBtn } = renderInputBars();

    expect(inputBar()).toBeInTheDocument();
    expect(submitBtn()).toBeInTheDocument();
  });

  it('제출 버튼을 클릭하면 서버로 제출이 되어야한다.', () => {
    const { onSubmit, clickSubmit } = renderInputBars();

    clickSubmit();

    expect(onSubmit).toHaveBeenCalled();
  });
});
