import React, { Component } from "react";
import axios from "axios";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.css";

import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
axios.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log("Error Data");
        console.log(error.response.data);
        return Promise.reject(error.response.data);
    }
);
class Signup extends Component {
    state = { name: "", email: "", password: "" };
    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };
    onSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/create-user", this.state);
            toast.success(data);
            setTimeout(() => {
                window.location = "/login";
            }, 1000);
        } catch (err) {
            toast.error("Creating User Failed");
        }
    };
    render() {
        const { name, email, password } = this.state;
        return (
            <React.Fragment>
                <div className="signup-page">
                    <div className="d-flex justify-content-center h-100">
                        <div className="signup-card">
                            <div className="d-flex justify-content-center signup-card-header">
                                <b>Sign Up</b>
                            </div>
                            <div className="signup-card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-user" />
                                            </span>
                                        </div>
                                        <input
                                            name={"name"}
                                            value={name}
                                            onChange={this.onChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-at" />
                                            </span>
                                        </div>
                                        <input
                                            name={"email"}
                                            value={email}
                                            onChange={this.onChange}
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-key" />
                                            </span>
                                        </div>
                                        <input
                                            name={"password"}
                                            value={password}
                                            onChange={this.onChange}
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock" />
                                            </span>
                                        </div>
                                        <input
                                            name={"password"}
                                            value={password}
                                            onChange={this.onChange}
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                    <div className="agree-group">
                                        <input
                                            className="agree-check"
                                            type="checkbox"
                                        />
                                        <span className="agreement">
                                            I agree to
                                        </span>
                                        <a target="_blank" href="/terms-of-use">
                                            Terms of Use
                                        </a>
                                        <span className="agreement"> and </span>
                                        <a
                                            target="_blank"
                                            href="/privacy-statement"
                                        >
                                            Privacy Statement
                                        </a>
                                    </div>
                                    <div className="agree-group">
                                        <input
                                            className="agree-check"
                                            type="checkbox"
                                        />
                                        <span className="agreement">
                                            I agree to recieve emails
                                        </span>
                                    </div>
                                    <div className="form-group d-flex justify-content-center">
                                        <button className="btn signup_btn">
                                            <b>Sign Up</b>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="signup-card-footer">
                                <div className="d-flex justify-content-center social link">
                                    <p>Signup with:</p>
                                    <span>
                                        <i className="fa icon fa-facebook-square" />
                                    </span>
                                    <span>
                                        <i className="fa icon fa-google-plus-square" />
                                    </span>
                                    <span>
                                        <i className="fa icon fa-twitter-square" />
                                    </span>
                                    <span>
                                        <i className="fa icon fa-github-square" />
                                    </span>
                                </div>
                            </div>
                            <div className="signup-card-footer">
                                <div className="d-flex justify-content-center link">
                                    <p>Already have an account?</p>
                                    <a href="/">LogIn</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Signup;
