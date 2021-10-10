import React from "react";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>HomePage!</h1>
                <Link to='/about'><h1>About 페이지로 이동하기</h1></Link>
            </div>
        )
    }
}