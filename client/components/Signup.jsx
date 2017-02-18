import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';

// TODO better client site validation

@inject("viewState", "appState") @observer
class Signup extends Component {

    /*
    @observable name="";
    @observable email="";
    @observable password="";
    */


    nameInput;
    emailInput;
    passwordInput;


    constructor(props) {
        super(props);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }



    //handleSubmit(event) {
    handleSubmit = (event) => {
        event.preventDefault();

        let name, email, password;
        name = this.nameInput.value;
        email = this.emailInput.value;
        password = this.passwordInput.value;

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

                // save token and user_id to appState
            })
            .catch(error => {
                console.log(error);
            });

        // lets just do the axios in here for now

        // use refs to get at the data

        // migrate this code into some sort of service object

        // saves name token into store

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
                                        ref={(input) => { this.nameInput = input; }}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="email">E-Mail</label>
                                    <input
                                        type="email"
                                        ref={(input) => { this.emailInput = input; }}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        ref={(input) => { this.passwordInput = input; }}
                                        class="form-control"
                                    />
                                </div>

                            </div>
                            <div class="justify-content-start modal-footer">
                                <button type="submit" class="btn btn-primary">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

};

export default Signup;
