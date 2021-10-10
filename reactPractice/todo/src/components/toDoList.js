import React from "react";

export default class ToDOList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const toDoListEl = this.props.toDoList.map((item, idx) => {
            return (
            <li key={idx}> 
                {item}
            </li>
            )
        })

        return (
            <ol>
                {toDoListEl}
            </ol>
        );
    }
}