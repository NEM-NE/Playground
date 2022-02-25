import React from "react";
import { Link } from "react-router-dom";

import ToDOList from "../components/toDoList";

export default class AboutPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toDoList: [],
        }
    }

    render() {
        const toDoList = this.props.location.state.toDoList.slice();

        return (
            <div>
                <h1>AboutPage!</h1>
                <Link to={{
                    pathname:'/',
                    state: {
                        toDoList
                    }
                }}>
                <h1>Home 페이지로 이동하기</h1></Link>
                <ToDOList toDoList={toDoList}/>
            </div>
        )
    }
}