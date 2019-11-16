import React, { Component } from "react";
import python from "./python.png";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./CoursePage.css";
import { toast } from "react-toastify";
// axios.interceptors.response.use(
//     function(response) {
//         return response;
//     },
//     function(error) {
//         return Promise.reject(error);
//     }
// );
class CoursePage extends Component {
    state = { courseDiscription: [], isAlreadyEnrolled: true };
    async componentDidMount() {
        const { data: courseDiscription } = await axios.get("/api/get-courses");
        this.setState({ courseDiscription });
        this.checkingIfAlreadyEnrolled();
    }
    async handleEnroll() {
        const { id: courseId } = this.props.match.params;
        const token = localStorage.getItem("token");
        try {
            const { data } = await axios.get(
                "/api/enroll-course/" + courseId + "?token=" + token
            );
            toast.success(data[0]);
            this.checkingIfAlreadyEnrolled();
        } catch (err) {
            toast.error("Error Occured");
        }
    }
    showLectures() {
        const { id: courseId } = this.props.match.params;
        this.props.history.push("/lectures/" + courseId);
    }
    async checkingIfAlreadyEnrolled() {
        const { id: courseId } = this.props.match.params;
        const token = localStorage.getItem("token");
        const { data: isAlreadyEnrolled } = await axios.get(
            "/api/checking-enrolled/" + courseId + "?token=" + token
        );
        this.setState({ isAlreadyEnrolled });
    }

    render() {
        const style = {
            width: "100%",
            height: "300px",
            background: "#505763"
        };
        const courseIdReceived = this.props.match.params.id;
        const courseToDisplay = this.state.courseDiscription.find(
            course => course.course_id == courseIdReceived
        );
        if (!courseToDisplay) return "";
        const { isAlreadyEnrolled } = this.state;
        return (
            <React.Fragment>
                <div style={style}>
                    <div
                        style={{
                            marginLeft: "130px",
                            marginRight: "130px",
                            display: "grid",
                            gridTemplateColumns: "700px auto",
                            paddingTop: "50px",
                            gridColumnGap: "40px"
                        }}
                    >
                        <div style={{ color: "white", textAlign: "justify" }}>
                            <h2>{courseToDisplay.course_name}</h2>
                            <p style={{ fontSize: "16px" }}>
                                {courseToDisplay.course_description}
                            </p>
                        </div>
                        <div>
                            <div
                                style={{
                                    height: "500px",
                                    background: "White",
                                    width: "100%",
                                    padding: "2px",
                                    boxShadow:
                                        "-10px 2px 24px 2px rgba(0,0,0,0.75)"
                                }}
                            >
                                <div>
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "160px",
                                            border: "1px solid black"
                                        }}
                                        src={python}
                                        alt=""
                                    />
                                    <br />
                                    <br />

                                    {isAlreadyEnrolled ? (
                                        <React.Fragment>
                                            <div>
                                                <h3 className="text-center">
                                                    Free Course{" "}
                                                    <span
                                                        style={{
                                                            textDecoration:
                                                                "line-through",
                                                            fontSize: "12px"
                                                        }}
                                                    ></span>
                                                </h3>
                                            </div>
                                            <div className="EnrollDiv">
                                                <button
                                                    className="EnrollBtn"
                                                    onClick={() =>
                                                        this.handleEnroll()
                                                    }
                                                >
                                                    Enroll
                                                </button>
                                            </div>
                                            <div className="EnrollDiv">
                                                <button className="CancelBtn">
                                                    Cancel
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <div className="EnrollDiv">
                                            <button
                                                className="EnrollBtn"
                                                onClick={() =>
                                                    this.showLectures()
                                                }
                                            >
                                                <i className="fa fa-play-circle fa-2x ">
                                                    Continue
                                                </i>
                                            </button>
                                        </div>
                                    )}
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <br />
                    {/* Side Enroll Div */}
                    <div
                        style={{
                            marginRight: "20px",
                            width: "700px",
                            height: "400px",
                            background: "#f2f3f5",
                            clear: "both",
                            color: "Black"
                        }}
                    >
                        <ul>
                            <div className="learndiv">
                                <h3>What you will learn</h3>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <li>
                                            You will become Agile certified (you
                                            will receive a certificate upon
                                            completion).
                                        </li>
                                    </div>
                                    <div className="col-md-6">
                                        <li>
                                            You will become Agile certified (you
                                            will receive a certificate upon
                                            completion).
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ width: "700px" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Asperiores hic perferendis qui velit non unde numquam
                        sed, recusandae facere vel illum cum quasi earum
                        obcaecati magnam, incidunt cupiditate molestiae
                        exercitationem.{" "}
                    </div>
                    <div>
                        <h3>Requirements</h3>
                        <p>{courseToDisplay.course_requirements}</p>
                    </div>
                    <div>
                        <h3>Course content</h3>
                        <p>{courseToDisplay.course_outline}</p>
                        <br />
                        <p>
                            {" "}
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Quam ea saepe dolores excepturi, iusto numquam
                            itaque, qui in culpa officiis provident, impedit
                            perspiciatis quidem labore enim quo deleniti? Modi,
                            mollitia.{" "}
                        </p>
                    </div>
                </div>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default CoursePage;
