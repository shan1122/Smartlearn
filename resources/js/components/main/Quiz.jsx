import React, { Component } from "react";
import Countdown from "react-countdown-now";
import axios from "axios";
import ReactCountdownClock from "react-countdown-clock";
import "./Quiz.css";
class Quiz extends Component {
    async componentDidMount() {
        const { id } = this.props.match.params;
        let { data: quizes } = await axios.get("/api/quiz/" + id);

        const timer = this.getTimer();
        quizes.length = 10;
        this.setState({ quiz: quizes });
    }
    componentDidUpdate(prev, next) {}
    getTimer() {
        return 10;
    }
    state = {
        quiz: [],
        answersGiven: [{}],
        index: 0,
        selected: null,
        timer: 15,
        renderTimer: null
    };

    answersGiven = () => {
        const { answersGiven, quiz, quiz_id, selected } = this.state;
        const isCorrent = quiz.filter(
            q => q.quiz_id == quiz_id && q.correct.trim() == selected.trim()
        );
        answersGiven.push({
            quiz_id: quiz_id,
            answer: selected,
            isCorrent: Boolean(isCorrent.length > 0)
        });
        this.setState({ answersGiven, quiz_id: "", selected: null });
    };
    render() {
        const length = this.state.quiz.length;
        const { index, timer } = this.state;
        console.log(this.state.timer);
        if (length === 0) return null;
        return (
            <React.Fragment>
                <div className="container mt-5 ">
                    <div className="row">
                        <div className="col-md-8">
                            {index < length
                                ? this.getQuestion(index)
                                : this.showResult()}
                        </div>
                        <div className="col-md-4">
                            {index < length && (
                                <ReactCountdownClock
                                    seconds={this.state.timer}
                                    color="#000"
                                    alpha={0.9}
                                    size={300}
                                    onComplete={() => this.increaseIndex()}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    increaseIndex() {
        let timer = null;
        const { timer: original } = this.state;
        if (typeof original == "string") timer = 15;
        else timer = "15";
        this.setState({ quiz_id: "", selected: null });
        this.setState({ index: this.state.index + 1, timer });
    }
    giveMeCounter() {
        return (
            <ReactCountdownClock
                seconds={this.state.timer}
                color="#000"
                alpha={0.9}
                size={300}
                onComplete={() => this.increaseIndex()}
            />
        );
    }
    showResult() {
        const { quiz, answersGiven } = this.state;
        const correct = answersGiven.filter(ans => ans.isCorrent == true);
        const length = correct.length;
        const token = localStorage.getItem("token");
        const callMe = async () =>
            await axios.post("/api/update-marks?token=" + token, {
                marks: length,
                id: quiz[0].topic_id
            });
        callMe();
        if (length >= 5) {
            return (
                <div>
                    {"  Obtained Marks:" + length + "/10"}
                    <br />
                    <div className="passed">
                        <h3 className="pass">congrats</h3>
                        <p>You have have passed exam new topics are unlocked</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{"Obtained Marks:" + length + "/10"}</h2>
                    <br />
                    <div className="failed">
                        <h3 className="fail">Sorry you are failed</h3>
                        <p> please try again later</p>
                    </div>
                </div>
            );
        }
    }

    getQuestion(index) {
        const { quiz } = this.state;
        return (
            <React.Fragment>
                <h2>{"Question " + " " + (index + 1) + "/" + " 10"}</h2>
                <h3>{quiz[index].question}</h3>
                {quiz[index].options.split(",").map((opt, key) => (
                    <div key={key}>
                        <br />
                        <input
                            type="radio"
                            id="answer"
                            name="answer"
                            value={opt}
                            selected={this.state.selected || null}
                            checked={this.state.selected === opt}
                            onChange={e =>
                                this.setState({
                                    selected: e.target.value,
                                    quiz_id: quiz[index].quiz_id
                                })
                            }
                        />
                        <label htmlFor="answer">{opt.trim()}</label> <br />
                    </div>
                ))}
                <button
                    disabled={!this.state.selected}
                    className="btn btn-primary"
                    onClick={() => {
                        this.answersGiven();
                        this.increaseIndex();
                    }}
                >
                    Submit Answer Move to Next
                </button>
            </React.Fragment>
        );
    }
}

export default Quiz;
