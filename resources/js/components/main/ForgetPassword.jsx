import React, { Component } from "react";
import axios from "axios";
import "./ForgetPassword.css";
import "bootstrap/dist/css/bootstrap.css";

class ForgetPassword extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div className="forget-page">
                    <div className="d-flex justify-content-center h-100">
                        <div className="forget-card">
                            <div className="d-flex justify-content-center forget-card-header">
                                <b>ForgetPassword</b>
                            </div>
                            <div className="forget-card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-user" />
                                            </span>
                                        </div>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="New Password"
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock" />
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm password"
                                        />
                                    </div>

                                    <div className="form-group d-flex justify-content-center">
                                        <button className="btn confirm_btn">
                                            <b>Confirm</b>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ForgetPassword;
