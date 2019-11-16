import React, { Component } from "react";
import axios from "axios";
import "./ResetPassword.css";
import "bootstrap/dist/css/bootstrap.css";
class ResetPassword extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div className="reset-page">
                    <div class="d-flex justify-content-center h-100">
                        <div className="reset-card">
                            <div className="d-flex justify-content-center reset-card-header">
                                <b>Reset Password</b>
                            </div>
                            <div className="reset-card-body">
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
                                            placeholder="Old Password"
                                        />
                                    </div>
                                    <div>
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
                                            name={"password"}
                                            value={password}
                                            onChange={this.onChange}
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

export default ResetPassword;
