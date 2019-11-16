import React, { Component } from "react";
import "./topic.css";
import { toast } from "react-toastify";

class Topics extends Component {
    state = { collapsed: true };
    render() {
        const { topic, topicId, unlocked } = this.props;
        const { collapsed } = this.state;
        if (!topicId) return null;
        return (
            <React.Fragment>
                <h2
                    onClick={() => this.setState({ collapsed: !collapsed })}
                    style={{
                        cursor: "pointer",
                        background: "	#F8F8FF",
                        hover: "#D3D3D3"
                    }}
                >
                    {topic.topic_name}
                </h2>
                {collapsed && this.rendering(topic)}
            </React.Fragment>
        );
    }
    rendering(topic) {
        const { data, handleChoose, unlocked, topicId, history } = this.props;
        const isUnlocked = unlocked.find(id => id == topicId);
        return (
            <ul style={{ listStyleType: "none" }}>
                {data.map((sampleData, index) =>
                    sampleData.topic_id == topicId ? (
                        <li
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (isUnlocked) {
                                    if (sampleData.lecture_name == "Quiz") {
                                        history.push(
                                            "/quiz/" + sampleData.topic_id
                                        );
                                    } else
                                        handleChoose(
                                            topicId,
                                            sampleData.lecture_id
                                        );
                                } else {
                                    toast.info("Kindly Complete The Previous");
                                }
                            }}
                            key={index}
                        >
                            {sampleData.lecture_name}
                        </li>
                    ) : (
                        ""
                    )
                )}
            </ul>
        );
    }
}

export default Topics;
