import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
    state = {};
    render() {
        const token = localStorage.getItem("token");
        const { pathname } = this.props.location;
        const hide = pathname == "/login" || pathname == "/signup";
        return (
            <nav
                hidden={hide}
                className="navbar navbar-expand-lg navbar-dark bg-dark"
            >
                <NavLink className="navbar-brand" to="/">
                    Smart Learn
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto ">
                        {token && (
                            <React.Fragment>
                                <li className="nav-item active link">
                                    <NavLink
                                        className="nav-link"
                                        to="/mycourses"
                                    >
                                        <i
                                            className="fa fa-book icon"
                                            aria-hidden="true"
                                        ></i>
                                        Enrolled Courses
                                    </NavLink>
                                </li>
                                <li className="nav-item active link">
                                    <NavLink className="nav-link" to="/profile">
                                        <i
                                            className="fa fa-user"
                                            aria-hidden="true"
                                        ></i>
                                        Profile
                                    </NavLink>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                    <NavLink to="/signup">
                        {!token && (
                            <button className="btn btn-danger mr-4">
                                Signup
                            </button>
                        )}
                    </NavLink>

                    <NavLink to="/login">
                        {!token && (
                            <button className="btn btn-primary mr-4">
                                {"Login"}
                            </button>
                        )}
                        {/* My profile Button */}

                        {token && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location = "/";
                                }}
                                className="btn btn-danger"
                            >
                                Logout
                            </button>
                        )}
                    </NavLink>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
