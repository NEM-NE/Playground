import React from "react";

export default class InputBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toDo: '',
        }

        this.enrollToDo = this.enrollToDo.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    enrollToDo(e){
        e.preventDefault();
        this.props.addToDo(this.state.toDo);
        this.setState({toDo: ''});
    }

    changeValue(e){
        this.setState({toDo: e.target.value});
    }

    render() {
        return (
            <form>
                <input type='text' value={this.state.toDo} onChange={this.changeValue}/>
                <button type='submit' onClick={this.enrollToDo}>To Do List에 추가하기</button>
            </form>
        );
    }
}