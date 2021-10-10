import React from "react";
import { Link } from "react-router-dom";

import InputBar from "../components/inputBar";
import ToDOList from "../components/toDoList";

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toDoList : (this.props.location.state) ? this.props.location.state.toDoList : [],
        }

        this.addToDo = this.addToDo.bind(this);
    }

    addToDo(value) {
        this.setState((state) => ({
            toDoList: [...state.toDoList, value]
        }))
    }

    render() {
        const toDoList = this.state.toDoList.slice();
        
        return (
            <div>
                <Link to={{
                    pathname:'/about',
                    state: {
                        toDoList:toDoList,
                    }
                }}>
                        <h1>About 페이지로 이동하기</h1>
                </Link>

                <InputBar addToDo={this.addToDo} />
                <ToDOList toDoList={toDoList}/>
            </div>
        )
    }
}