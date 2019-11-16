import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./frontpage.css";
import Navbar from "./Navbar";
import Grids from "./Grids";
import Footer from "./Footer";
import axios from "axios";

class FrontPage extends Component {
    state = { courseDiscription: [] };
    async componentDidMount() {
        const { data: courseDiscription } = await axios.get("/api/get-courses");
        this.setState({ courseDiscription });
    }
    render() {
        return (
            <div style={{ overflow: "hidden" }}>
                {/* <Navbar></Navbar> */}
                <div className="addition">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-4 additional-text">
                            <div className="heading">
                                <h2>Welcome to Future</h2>
                            </div>
                            <div className="paragraph">
                                <p>
                                    We are providing all courses of software
                                    engineering domain{" "}
                                </p>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Your Desired Courses"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        id="basic-addon2"
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
                <Grids
                    courses={this.state.courseDiscription}
                    generateProgressBarAlso={false}
                ></Grids>
                <Footer></Footer>
            </div>
        );
    }
}

export default FrontPage;
