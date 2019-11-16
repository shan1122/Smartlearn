import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
import "./Footer.css";

class Footer extends Component {
    state = {};
    render() {
        return (
            <footer className="footer">
                <Row>
                    <Col className="section" col="4" sm="4">
                        <h5 className="FooterHeadings">ABOUT US</h5>
                        <hr />
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Soluta, fuga impedit pariatur nulla sapiente
                            quos aut illo neque architecto consequatur alias
                            accusantium, labore, commodi dolorum nihil deserunt
                            atque quisquam autem!
                        </p>
                    </Col>
                    <Col className="section" col="4" sm="4">
                        <h5 className="FooterHeadings">CATEGORIES</h5>
                        <hr />
                        <p>
                            <a href="#!">Smart LearnApp</a>
                        </p>
                        <p>
                            <a href="#!">Help{"&"}Support</a>
                        </p>
                        <p>
                            <a href="/pricing">About Us</a>
                        </p>
                    </Col>
                    <Col className="section" col="4" sm="4">
                        <h5 className="FooterHeadings">CONTACT</h5>
                        <hr />
                        <p>
                            <i className="fa fa-home " /> comsats raiwind,
                            lahore
                        </p>
                        <p>
                            <i className="fa fa-envelope" /> info@example.com
                        </p>
                        <p>
                            <i className="fa fa-phone" /> + 01 234 567 88
                        </p>
                        <p>
                            <i className="fa fa-print" /> + 01 234 567 89
                        </p>
                    </Col>
                </Row>
                <hr />
                <div className="copyright">
                    © 2018 Copyright:
                    <a href="">Smart Learn</a>
                </div>
            </footer>
        );
    }
}

export default Footer;
