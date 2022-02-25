# 프론트엔드 테스트
​
> react-testing-library (RTL) + Jest
> 
​
# Find target
​
```jsx
const { queryByText, getByText, container } = render(
  <Wrapper>
    <Component />
  </Wrapper>
);
```
​
- queryBy  : 찾는 대상이 없을 수도 있을 때
- getBy : 찾는 대상이 있는 경우만 (못찾으면 에러발생)
- container : 렌더링 되는 DOM의 parent째로 반환
- ByTestId : Element의 dataset.testid를 이용해 찾을 수 있음
​
getBy와 queryBy의 경우 상황에 따라서 사용하시면 됩니다.
​
- `getBy...`: Returns the matching node for a query, and throw a descriptive error if no elements match *or* if more than one match is found (use `getAllBy` instead if more than one element is expected).
- `queryBy...`: Returns the matching node for a query, and return `null` if no elements match. This is useful for asserting an element that is not present. Throws an error if more than one match is found (use `queryAllBy` instead if this is OK).
​
```jsx
// 1. 화면에 나타나야 하는 문구를 테스트하고 싶은 경우
const target = getByText(/* 정규 표현식 or string */);
expect(target).toBeInTheDocument();
​
// 2. 화면에 해당 문구가 나타나지 않음을 테스트 하고 싶은 경우
const target = queryByText(/* 정규 표현식 or string */);
// getByText를 사용할 경우 렌더링 되지 않은것을 찾으려 하므로 에러가 발생함
expect(target).toBe(null);
```
​
container, getBy 등을 이용해 Element를 찾은 후 class등을 검사할 수도 있다.
​
```jsx
const { container, getByText } = render(<MyComponent />)
​
// DOM을 건드리기 때문에 다음과 같은 방식도 
const target = container.querySelector('[data-foo="bar"]'); // class, id ...
​
// Element.classList를 이용
const targetElement = getByText(/* target */);
​
expect(targetElement.classList.contains('class-name')).toBe(true);
```
​
getBy, queryBy 등으로 테스트하고싶은 대상을 찾기 어려운 경우 ByTestId를 이용할 수 있다.
​
```jsx
// 찾고싶은 element에 testid를 설정한다.
<div data-testid="custom-element" />
​
const { getByTestId } = render(<MyComponent />)
​
const target = getByTestId('custom-element');
```
​
# Mocking
​
mock은 가짜 로 무언가를 만드는 것이다.
​
redux등을 사용하는 경우 selector, dispatch등을 mock으로 생성해야 한다.
​
우선 store를 사용하기 위해 Provider를 테스트하고자 하는 컴포넌트에 감싼다.
​
```jsx
const Wrapper = ({ children }) => {
  const store = getStore();
  return <Provider store={store}>{children}</Provider>;
};
```
​
이후 reactRedux 모듈에서 select, dispatch 함수를 spyOn으로 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고, 해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아낼 수 있다.
​
```jsx
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
```
​
각 테스트마다 mock 함수를 초기화 해준다
​
```jsx
afterEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});
```
​
이후 테스트코드들마다 함수를 mocking한다.
​
## dispatch
​
dispatch의 경우 다음과 같이 mock을 생성할 수 있다.
​
```jsx
const mockDispatch = (action) => {
	// action에 따른 분기
	switch(action){
		case 'foo':{
			/* do something */
		}
		case 'bar':{
			/* do something */
		}
	}
​
	// or like this
	if(action){
		
	} else {
		
	}
};
​
useDispatchMock.mockReturnValue(mockDispatch);
```
​
## selector
​
하나의 selector만 사용하는 경우 다음과 같이 사용할 수 있다.
​
```jsx
const mockSelectorValue = something;
​
useSelectorMock.mockReturnValue(mockSelectorValue);
```
​
여러개의 selector를 사용하는 경우 mock state를 먼저 만들고 selector에서 상황별로 mock state의 값을 반환하도록 설정하는 방식으로 해결 가능하다.
​
이는 selector의 인자는 결국 state에서 parametor를 뽑아오는 callback이기 때문이다.
​
```jsx
// 다음과 같은 상황이라고 할 때
const fooSelector = (state: State) => (state.foo);
const barSelector = (state: State) => (state.bar);
​
useSelector(fooSelector);
useSelector(barSelector);
​
// mocking을 해준다.
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));
// spyOn을 이용할 경우 위 코드는 필요 없음
​
const mockState = {
	foo: "hello",
	bar: "world"
}
​
useSelector.mockImplementation(callback => callback(mockState));
```
​
## act()
​
> 컴포넌트의 진단을 준비하기 위해서는 컴포넌트를 렌더링하고 갱신해주는 코드를 act()를 호출한 것의 안에 넣어줘야 합니다.  이를 통해 React를 브라우저 내에서 동작하는 것과 비슷한 환경에서 테스트할 수 있습니다.
> 
​
react-testing-library는 내부 API에 act를 내포하고 있다.
​
따라서 굳이 act로 감싸서 호출하지 않고 렌더링과 업데이트를 할 수 있다.
​
만약 dispatch에서 Promise를 반환하는 경우에 테스트가 필요한 경우 waitFor을 이용해 비동기 테스트를 수행한다.
​
```jsx
act(() => {
	// ex) button을 클릭하면 fetch를 요청하고, 이후 데이터에 따라서 state가 변할때
	button.click(); // Promise resolve 이후 state가 변함
});
​
// waitFor를 이용해 state가 변한 이후 테스트
waitFor(() => {
	// test
});
```
​
이 때 여러번 act를 사용하는 경우 await를 이용하고, 이전 act 이후에 다음 act를 사용해 테스트 할 수 있다.
​
```jsx
await act(async () => {
	// change state
  fireEvent.click(buttonTarget);
​
  await waitFor(() => {
    const warnTarget = getByText(query);
    expect(warnTarget).toBeInTheDocument();
  });
});
​
await act(async () => {
	// change state
  fireEvent.click(buttonTarget);
​
  await waitFor(() => {
    const warnTarget = getByText(query);
    expect(warnTarget).toBeInTheDocument();
  });
});
```
​
만약 테스트하는 컴포넌트가 다른 dispatch나 외부 라이브러리 의존성이 강한 컴포넌트를 import해서 사용하고 있을 때 해당 컴포넌트만 mock으로 만드는 편이 간단하다.
​
(테스트 하고싶은 로직과 상관 없는 경우)
​
```jsx
// popup등과 같은 경우 mock으로 만드는 편이 간편함
jest.mock("@/components/popups/basic_popup", () => {
  return {
    BasicPopup: () => {
      return <></>;
    },
  };
});
```
​
참고 예제
​
[Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)
​
[react-testing-library의 "not wrapped in act" Errors 원인과 해결법](https://coffeeandcakeandnewjeong.tistory.com/65)
​
# CustomHook test
​
@testing-library/react-hooks를 이용해 custom hook만 테스트 할 수 있다.
​
```jsx
import { renderHook } from "@testing-library/react-hooks";
​
// 두가지 방법으로 custom hook의 state, data를 가져올 수 있다.
const { result, waitForNextUpdate } = renderHook(() => useCustomHook());
const { result, waitForNextUpdate } = renderHook(useCustomHook);
​
// 필요한 data를 result.current를 이용해 뽑아올 수 있다.
result.current.data;
result.current.updateData();
​
// 다음과 같은 구조분해 할당으로 뽑아올 경우 state값이 제대로 업데이트 되지 않을 수 있다.
// state가 업데이트 될 때 바뀌는 값이 result.current 임에 유의하자.
const { data, updateData } = result.current;
​
updateData(newData);
expect(data).toBe(newData);                // X
expect(result.current.data).toBe(newData); // O
​
// useEffect 등과 같이 비동기적으로 업데이트 되야하는 상황을 기다릴 때 사용할 수 있다.
await waitForNextUpdate();
```
​
# React hook form 테스트
​
react-hook-from을 사용할 때 isValid 등의 custom hook의 초기값이 제대로 설정되지 않는 경우가 있다.
​
예시)
​
- isValid : 초기값은 true이며, 테스트를 시작해야 하는 초기상태에 유효하지 않은 데이터들을 검사 후에 true/false로 바뀜
​
이 경우 다음 방법들로 `원하는 초기상태`를 만들고 사용할 수 있다.
​
## waitForElement (Deprecated)
​
공식 문서에서 추천하지 않는 방법 중 하나이다.
​
waitForElement를 이용해 custom hook의 값들의 초기값들이 제대로 설정된 후의 target들을 찾아낼 수 있다.
​
```jsx
const { getByTestId, asFragment } = render(<MyComponent />);
​
const target = await waitForElement(() => getByTestId('target'));
```
​
## await with findBy
​
> findBy methods are a combination of getBy queries and waitFor.
> 
​
findBy 를 이용하면 내부에 자동으로 waitFor 기능이 내장되어 있다. (Promise를 반환)
​
따라서 findBy 쿼리와 async await를 이용해 초기값이 제대로 설정된 상태에서 target을 찾을 수 있다.
​
```jsx
const target = await findByTestId('target');
```
​
## react-hook-form으로 테스트할 수 있는 매우 기본적인 예제
​
[React Hook Form - Unit Test](https://codesandbox.io/s/react-hook-form-unit-test-s4j7c?file=/src/App.test.js)
​
[satansdeer/testing-react-hook-form](https://github.com/satansdeer/testing-react-hook-form/blob/master/src/SingIn.spec.js)
​
# 이슈
​
## flowjs 관련
​
### querySelector, firstChild등을 이용할때 경고 메시지
​
```jsx
// As-Is
​
// firstChild가 null, undefined일 수 있으므로 경고가 표시됨
const button = await findByTestId("submitWrapper");
​
expect(confirmButton.firstChild.classList.contains('disabled')).toBe(true);
```
​
```jsx
// To-Be
​
// 최대한 검사 하고 싶은 target을 직접 찾아서 검사 (테스트 가능한 구조로 설계하기)
const button = await findByTestId("submitBtn");
​
expect(confirmButton.classList.contains('disabled')).toBe(true);
```