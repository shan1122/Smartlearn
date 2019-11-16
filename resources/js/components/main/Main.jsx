import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import CoursePage from "./CoursePage";
import Signup from "./Signup";
import Navbar from "./Navbar";
import FrontPage from "./FrontPage";
import CourseContent from "./CourseContent";
import ForgetPassword from "./ForgetPassword";
import Email from "./Email";
import MyCourses from "./MyCourses";
import Profile from "./Profile";
import Lectures from "./sidebar/Lectures";
import Quiz from "./Quiz";
import Test from "./Test";

class Main extends Component {
    state = {};
    render() {
        const token = localStorage.getItem("token");
        if (token == "undefined") this.props.history.push("/");
        return (
            <div className="Main">
                <React.Fragment>
                    {<Navbar></Navbar>}
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/" exact component={FrontPage}></Route>
                        {!token && (
                            <Route
                                path="/signup"
                                exact
                                component={Signup}
                            ></Route>
                        )}
                        <Route path="/email" exact component={Email}></Route>
                        <Route
                            path="/forget"
                            exact
                            component={ForgetPassword}
                        ></Route>
                        {token && (
                            <React.Fragment>
                                <Route
                                    path="/coursepage/:id"
                                    exact
                                    component={CoursePage}
                                ></Route>
                                <Route
                                    path="/content"
                                    exact
                                    component={CourseContent}
                                />
                                <Route
                                    path="/mycourses"
                                    exact
                                    component={MyCourses}
                                />
                                <Route
                                    path="/lectures/:id"
                                    exact
                                    component={Lectures}
                                />
                                <Route
                                    path="/profile"
                                    exact
                                    component={Profile}
                                ></Route>
                                <Route
                                    path="/quiz/:id"
                                    exact
                                    component={Quiz}
                                />
                                <Route path="/test" exact component={Test} />
                            </React.Fragment>
                        )}
                        <Redirect to="/"></Redirect>
                    </Switch>
                </React.Fragment>
            </div>
        );
    }
}

export default Main;
