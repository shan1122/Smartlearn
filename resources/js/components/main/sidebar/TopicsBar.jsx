import React, { Component } from "react";
import Topics from "./Topics";
import axios from "axios";
class TopicBar extends Component {
    state = { collapsed: true, unlocked: [] };
    async componentDidMount() {
        const token = localStorage.getItem("token");
        console.log("Topics............");
        console.log(this.props.course_id);
        const { data } = await axios.get(
            "/api/get-status/" + this.props.courseId + "?token=" + token
        );
        this.setState({ unlocked: data });
        console.log(data);
    }
    render() {
        const { data, topics, handleChoose, heading } = this.props;
        console.log(topics);
        if (!topics && !unlocked) return null;
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    boxShadow: " -6px -1px 25px 0px rgba(0,0,0,0.75)"
                }}
            >
                {topics.map((topic, index) => (
                    <Topics
                        topicId={topic}
                        unlocked={this.state.unlocked}
                        handleChoose={handleChoose}
                        key={index}
                        data={data}
                        topic={this.gettingTopicName(topic)}
                        {...this.props}
                    />
                ))}
            </div>
        );
    }
    gettingTopicName = id =>
        this.props.heading.filter(heading => heading.topic_id == id)[0];
}

export default TopicBar;
