import React, { Component } from "react";
import "./Email.css";
import "bootstrap/dist/css/bootstrap.css";
class Email extends Component {
    state = {};
    render() {
        return (
            <div className="email-page">
                <div className="d-flex justify-content-center h-100">
                    <div className="email-card">
                        <div className="d-flex justify-content-center email-card-header">
                            <b>Forget Password</b>
                        </div>
                        <div className="email-card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-at" />
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="form-group d-flex justify-content-center">
                                    <button className="btn email_btn">
                                        <b>send Email</b>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Email;
