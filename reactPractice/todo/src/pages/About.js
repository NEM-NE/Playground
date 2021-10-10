import React from "react";
import { Link } from "react-router-dom";

export default class AboutPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>AboutPage!</h1>
                <Link to='/'><h1>Home 페이지로 이동하기</h1></Link>
            </div>
        )
    }
}