import React, { Component } from "react";
import axios from "axios";
import Grids from "./Grids";
class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { enrolledCourses: [] };
    }
    async componentDidMount() {
        const token = localStorage.getItem("token");
        const { data: enrolledCourses } = await axios.get(
            "/api/enrolled-courses?token=" + token
        );
        this.setState({ enrolledCourses });
    }
    render() {
        if (!this.state.enrolledCourses) return "";
        return (
            <div>
                <Grids
                    generateProgressBarAlso={true}
                    courses={this.state.enrolledCourses}
                ></Grids>
            </div>
        );
    }
}
export default MyCourses;
