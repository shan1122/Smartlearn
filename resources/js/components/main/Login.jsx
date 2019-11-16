import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import axios from "axios";
class Login extends Component {
    state = { email: "", password: "" };
    changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };
    submitHandler = async e => {
        e.preventDefault();
        const { data } = await axios.post("/api/login", this.state);
        localStorage.setItem("token", data.access_token);
        window.location = "/";
    };
    render() {
        const { email, password } = this.state;
        return (
            <React.Fragment>
                <div className="login-page">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <b>Log In</b>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.submitHandler}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-user" />
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-key" />
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                            name="password"
                                            value={password}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="row align-items-center remember" />
                                    <div className="form-group d-flex justify-content-center">
                                        <button
                                            type="submit"
                                            className="login_btn"
                                        >
                                            <b>Login</b>
                                        </button>
                                    </div>
                                </form>
                                <div className="d-flex justify-content-center social link">
                                    <p>Login with:</p>
                                    <span>
                                        <i
                                            className="fa icon fa-google
                                        "
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center link">
                                    <p>Don't have an account?</p>
                                    <a href="/">Sign Up</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="/">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
