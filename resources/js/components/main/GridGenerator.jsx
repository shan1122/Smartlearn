import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Progress } from "react-sweet-progress";

import "./GridGenerator.css";
import axios from "axios";
class GridGenerator extends Component {
    state = {};
    async componentDidMount() {
        const { course, generateProgressBarAlso } = this.props;
        if (generateProgressBarAlso) {
            const { data: progress } = await axios.get(
                "/api/get-progress/" +
                    course.course_id +
                    "?token=" +
                    localStorage.getItem("token")
            );
            console.clear();
            console.log("Progreess");
            console.log(progress);
            this.setState({ progress: progress * 100 });
        }
    }
    render() {
        const {
            image,
            text,
            heading,
            link,
            course,
            generateProgressBarAlso
        } = this.props;
        const insideStyle = {
            height: "100%",
            border: "1px solid gray",
            padding: "1px"
        };
        const style = {
            height: "200px",
            width: "100%",
            border: "0.5px black solid"
        };
        return (
            <div>
                <div style={insideStyle} className="nav">
                    <NavLink
                        className="nav-link"
                        to={"/coursepage/" + course.course_id}
                    >
                        <img style={style} src={image} alt="" />
                        <h4
                            style={{ color: "black", fontSize: "20px" }}
                            className="headings"
                        >
                            {heading}
                        </h4>
                        <p className="para">{text}</p>

                        {generateProgressBarAlso && (
                            <div>
                                <Progress
                                    percent={this.state.progress + ""}
                                    status="success"
                                />
                            </div>
                        )}
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default GridGenerator;
