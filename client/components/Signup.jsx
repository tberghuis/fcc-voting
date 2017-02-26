import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';

@inject("viewState", "appState") @observer
class Signup extends Component {

    @observable name;
    @observable email;
    @observable password;

    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.checkFormValidated() == "disabled") return;

        let name, email, password;
        name = this.name;
        email = this.email;
        password = this.password;

        axios.post('/auth/signup', { name, email, password })
            .then((response) => {

                // this stuff should probably move into service class
                // this seperation MVC code is more trouble than its worth for small projects

                console.log('saved successfully');
                this.props.appState.loggedIn = true;
                this.props.appState.name = name;
                this.props.viewState.signupModal = false;

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user._id);
                localStorage.setItem('name', response.data.user.name);
            })
            .catch(error => {
                console.log(error);
                alert("Could not sign up. Try a different email.");
            });
    }

    checkFormValidated = () => {
        let name, email, password;
        name = this.name;
        email = this.email;
        password = this.password;
        if(!name || !email || !password)return "disabled";
        if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
            return "disabled";
        }
    }


    render() {
        return (
            <div className="modal d-block">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div class="modal-header">
                                <h5 class="modal-title">Sign Up</h5>
                                <button type="button" class="close" aria-label="Close" onClick={() => { this.props.viewState.signupModal = false; }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) => { this.name = e.target.value; }}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="email">E-Mail</label>
                                    <input
                                        type="email"
                                        onChange={(e) => { this.email = e.target.value; }}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        onChange={(e) => { this.password = e.target.value; }}
                                        class="form-control"
                                    />
                                </div>

                            </div>
                            <div class="justify-content-start modal-footer">
                                <button type="submit"  class={"btn btn-primary " + this.checkFormValidated()}>Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

};

export default Signup;
