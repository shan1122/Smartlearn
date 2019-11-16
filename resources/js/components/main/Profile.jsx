import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import { toast } from "react-toastify";
//import Navbar from "/.NavBar";
axios.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        return Promise.reject(error.response.data[0]);
    }
);

class Profile extends Component {
    state = {
        name: "",
        fName: "",
        newLastName: "",
        Lname: "",
        getprofile: true,
        changepassword: false,
        logout: false,
        error: {}
    };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };
    async componentDidMount() {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/me?token=" + token);
        this.setState({ name: data.name });
    }
    render() {
        return (
            <div className="container" style={{ marginTop: "20px" }}>
                <div className="row border">
                    <div className="col-md-3 border">
                        <h3 className="text-center">{this.state.name}</h3>
                        <br />
                        <br />
                        <br />
                        <span
                            onClick={() =>
                                this.handleFormsAppearance("getprofile")
                            }
                            className="links"
                        >
                            {" "}
                            Profile
                        </span>{" "}
                        <br />
                        <span
                            onClick={() =>
                                this.handleFormsAppearance("changepassword")
                            }
                            className="links"
                        >
                            {" "}
                            Change Password
                        </span>{" "}
                        <br />
                        <span
                            onClick={() => this.handleFormsAppearance("logout")}
                            className="links"
                        >
                            Logout
                        </span>
                    </div>
                    <div className="col-md-9 border">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center">
                                    Public Information
                                </h2>
                                <p className="text-center">
                                    Add information about yourself
                                </p>

                                <br />
                            </div>
                            <div className="col-md-12">
                                {this.state.getprofile && this.getprofile()}
                                {this.state.changepassword &&
                                    this.changepassword()}
                                {this.state.logout && this.logout()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleFormsAppearance(which) {
        const currentState = this.state;
        Object.keys(currentState).map(key => {
            if (key != which) {
                this.setState({ [key]: false });
            }
        });
        this.setState({ [which]: true });
    }
    submitNameChange = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                "/api/update-user?token=" + token,
                this.state
            );
            const newName = this.state.fName + " " + this.state.lName;
            toast(data[0]);
            this.setState({ name: newName });
        } catch (err) {
            console.log(err);
            toast.error("Cannot Update The Name Error Occured");
        }
    };
    getprofile() {
        return (
            <form onSubmit={this.submitNameChange}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="firstname"
                        name="fName"
                        required
                        onChange={this.handleChange}
                        aria-describedby="fName"
                    />
                    {/* <span id="fName">{error.fName}</span> */}
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lName"
                        required
                        onChange={this.handleChange}
                        aria-describedby="lName"
                    />
                    {/* <span id="lName">{error.lName}</span> */}
                    <br />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                <br />
                <br />
                <br />
            </form>
        );
    }
    submitChangePasswordRequest = async e => {
        e.preventDefault();
        if (this.state.newPassword != this.state.checkNewPassword) {
            toast.error("New Password Does Not Match");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                "/api/update-password?token=" + token,
                this.state
            );
            toast.success(data[0]);
        } catch (err) {
            toast.error(err);
        }
    };
    changepassword() {
        return (
            <form onSubmit={this.submitChangePasswordRequest}>
                <div className="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Old Password"
                        name="oldPassword"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        type="password"
                        class="form-control"
                        placeholder="New Password"
                        name="newPassword"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Confirm New Password"
                        name="checkNewPassword"
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Change Password
                </button>
            </form>
        );
    }
    logout() {
        localStorage.removeItem("token");
        window.location = "/";
    }
}

export default Profile;
