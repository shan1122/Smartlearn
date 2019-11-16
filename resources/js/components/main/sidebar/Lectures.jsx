import React, { Component } from "react";
import TopicBar from "./TopicsBar";
import PDFArea from "./PDFarea";
import { Document } from "react-pdf";
import "./pdf.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import PDFViewer from "pdf-viewer-reactjs";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const options = {
    cMapUrl: "cmaps/",

    cMapPacked: true
};
import "./topic.css";

class Lectures extends Component {
    async showLectures() {
        const { id: courseId } = this.props.match.params;
        const { data } = await axios.get("/api/load_lectures/" + courseId);
        // const
    }
    state = {
        booksOpen: false,
        resaerchPaper: false,
        lecturesOpen: false,
        courseNumber: "",
        lectureId: "",
        topics: [],
        selectedPaper: "",
        samplePDF: [],
        researchPaper: [],
        books: [],
        selectedBook: ""
    };

    async componentDidMount() {
        const { id: courseId } = this.props.match.params;
        const { data: samplePDF } = await axios.get(
            "/api/load_lectures/" + courseId
        );
        const { data: topics } = await axios.get("/api/topics");

        const { data: researchPaper } = await axios.get(
            "/api/load_papers/" + courseId
        );
        const { data: books } = await axios.get("/api/load_books/" + courseId);
        this.setState({ samplePDF, topics, researchPaper, books });
    }
    gettingTopics = () => {
        let array = [];
        for (let i = 0; i < this.state.samplePDF.length; i++) {
            array.push(this.state.samplePDF[i].topic_id);
        }
        let remove = new Set(array);
        return [...remove];
    };
    renderPDF() {
        const { courseNumber, lectureId, samplePDF } = this.state;
        const lecture = samplePDF.filter(
            course =>
                course.topic_id == courseNumber &&
                course.lecture_id == lectureId
        );
        const data = lecture[0];
        if (data) return data.lecture_src;
        return "";
    }
    handleChooseLecture = (courseNumber, lectureId) => {
        console.log("Course Number");
        console.log(courseNumber);
        this.setState({ courseNumber, lectureId });
    };
    render() {
        const { booksOpen, lecturesOpen, resaerchPaper } = this.state;
        const topics = this.gettingTopics();
        return (
            <div className="row">
                {/* <hr style={{ width: "100%", color: "gray" }} /> */}
                <div className="col-md-1">
                    <ul className="backgroudbutton">
                        <li
                            className={
                                this.state.lecturesOpen
                                    ? "btntopic activeClass"
                                    : "btntopic"
                            }
                            onClick={() =>
                                this.setState({
                                    lecturesOpen: true,
                                    booksOpen: false,
                                    resaerchPaper: false
                                })
                            }
                        >
                            Topic
                        </li>
                        <li
                            className={
                                this.state.resaerchPaper
                                    ? "btntopic  activeClass"
                                    : "btntopic"
                            }
                            onClick={() =>
                                this.setState({
                                    lecturesOpen: false,
                                    booksOpen: false,
                                    resaerchPaper: true
                                })
                            }
                        >
                            Research Paper
                        </li>
                        <li
                            className={
                                this.state.booksOpen
                                    ? "btntopic activeClass"
                                    : "btntopic"
                            }
                            onClick={() =>
                                this.setState({
                                    lecturesOpen: false,
                                    booksOpen: true,
                                    resaerchPaper: false
                                })
                            }
                        >
                            Books
                        </li>
                    </ul>
                </div>
                <div className="col-md-11">
                    {lecturesOpen && this.getTopics()}
                    {resaerchPaper && this.getRequestedContent("researchPaper")}
                    {booksOpen && this.getRequestedContent("books")}
                </div>
            </div>
        );
    }
    open(name) {}
    getRequestedContent(toBeRendered) {
        return (
            <div className="row">
                <div className="col-8 col-md-8">
                    <PDFArea>
                        <PDFViewer
                            navbarOnTop={true}
                            css="pdf-height"
                            document={{
                                url: "/" + this.state.selectedPaper
                            }}
                        />
                    </PDFArea>
                </div>
                <div
                    className="col-4 col-md-4 "
                    style={{
                        height: "600px",
                        overflow: "scroll"
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            boxShadow: " -6px -1px 25px 0px rgba(0,0,0,0.75)"
                        }}
                    >
                        <ul>
                            {this.state[toBeRendered].map((paper, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        toBeRendered === "books"
                                            ? this.setState({
                                                  selectedPaper: paper.book_src
                                              })
                                            : this.setState({
                                                  selectedPaper:
                                                      paper.research_paper_src
                                              })
                                    }
                                >
                                    {toBeRendered === "books"
                                        ? paper.book_name
                                        : paper.research_paper_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    getTopics() {
        const topics = this.gettingTopics();
        const { topics: topic } = this.state;
        console.log("Logging Topics Array");
        console.log(topics);
        console.log("Logging Object");
        console.log(topic);
        const course = topic.find(t => t.topic_id == topics[0]);
        if (!course) return null;
        const course_id = course.course_id;
        return (
            <div className="row">
                <div className="col-8 col-md-8">
                    <PDFArea>
                        <PDFViewer
                            navbarOnTop={true}
                            css="pdf-height"
                            document={{
                                url: "/" + this.renderPDF()
                            }}
                        />
                    </PDFArea>
                </div>
                <div
                    className="col-4 col-md-4 "
                    style={{
                        height: "600px",
                        overflow: "scroll"
                    }}
                >
                    <TopicBar
                        courseId={course_id}
                        heading={this.state.topics}
                        topics={topics}
                        data={this.state.samplePDF}
                        handleChoose={this.handleChooseLecture}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default Lectures;
