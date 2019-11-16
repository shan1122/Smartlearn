import React, { Component } from "react";
import cover from "./cover.jpg";
import QA from "./QA.jpg";
import Testing from "./Testing.png";
import SPM from "./SPM.jpg";
import Req from "./Req.png";
import SE3 from "./SE3.jpg";
import Design from "./Design.jpg";
import GridLayout from "./GridLayout";
import GridGenerator from "./GridGenerator";
import { faQuran } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
class Grids extends Component {
    state = {};
    render() {
        const imageArray = [QA, Testing, SPM, Req, SE3, Design];
        const { courses, generateProgressBarAlso } = this.props;
        console.log(courses);

        return (
            <React.Fragment>
                <GridLayout title={"Available Courses"} numberOfCoulmns={4}>
                    {courses.map((course, index) => (
                        <GridGenerator
                            course={course}
                            generateProgressBarAlso={generateProgressBarAlso}
                            key={index}
                            image={imageArray[index]}
                            heading={course.course_name}
                            text={course.course_introduction}
                        ></GridGenerator>
                    ))}
                </GridLayout>
                {/* <GridLayout></GridLayout> */}
            </React.Fragment>
        );
    }
}

export default Grids;
