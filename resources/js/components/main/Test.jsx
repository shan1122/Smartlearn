import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Test.css";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import "./BG1.png";
class Test extends Component {
    state = {};

    render() {
        return (
            <div className="container">
                <br />
                <br />
                <br />
                <div className="row r1">
                    <div className="col-md-3">
                        <img
                            src="BG1.png"
                            alt="..."
                            class="img-thumbnail"
                        ></img>
                    </div>
                    <div className="col-md-9">
                        <h3>Intro to software Engineering</h3>
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow="70"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                70%
                            </div>
                        </div>
                        <div>
                            <br />
                            <Progress percent={70} status="success" />
                        </div>
                        <br />
                        <button className="btn btn-primary">Continue</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Test;
