import React, { Component } from "react";
import "./GridGenerator.css";
class GridLayout extends Component {
    state = {};
    handleGenerateColumns() {
        const { numberOfCoulmns } = this.props;
        let columns = "";
        for (let i = 0; i < numberOfCoulmns; i++) {
            columns += " " + "auto";
        }
        console.log(columns);
        return columns;
    }
    render() {
        const { title } = this.props;
        return (
            <div
                className="container"
                style={{
                    marginTop: "20px",
                    color: "darkgrey",
                    marginBottom: "30px"
                }}
            >
                <h4 style={{ color: "black" }}>{title}</h4>
                <div
                    className="girds"
                    style={{
                        display: "grid",
                        gridTemplateColumns: this.handleGenerateColumns(),
                        gridColumnGap: "10px",
                        gridRowGap: "10px"
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default GridLayout;
