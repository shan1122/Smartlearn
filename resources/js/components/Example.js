import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Main from "./main/Main";
import Lectures from "./main/sidebar/Lectures";
import "bootstrap/dist/css/bootstrap.css";
import FrontPage from "./main/FrontPage";
import Quiz from "./main/Quiz";
import Profile from "./main/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import ChangePassword from "./mian/ChangePassword";
export default class Example extends Component {
    render() {
        return (
            <BrowserRouter>
                <ToastContainer></ToastContainer>
                <Main></Main>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
