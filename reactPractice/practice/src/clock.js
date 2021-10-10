import React from "react";

/*
    state 업데이트는 비동기적일 수 도 있다.
    this.setState({...})보다는
    this.setState((params...) => {{...}})로 설정

    state는 자기 자신 컴포넌트만 접근 가능하고 부모나 자식 컴포넌트는 모른다 => 자신의 state를 자식에게 props로 전달하기 때문 => 캡슐화 가능

    const name = target.name;

    this.setState({
      [name]: value
    });
    
    를 통해 동적으로 state 관리 가능
*/

export default class Clock extends React.Component {
    constructor(props) {
      super(props);
      // state 설정은 여기에서만 나머지는 setState를 사용할 것.
      this.state = {date: new Date()};
    }
  
    // 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({date : new Date()});
        }, 1000);
    }

    // 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 해당 메서드 호출
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }