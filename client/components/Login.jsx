import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';

@inject("viewState", "appState") @observer
class Login extends Component {
    emailInput;
    passwordInput;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let email, password;
        email = this.emailInput.value;
        password = this.passwordInput.value;

        axios.post('/auth/login', { email, password })
            .then((response) => {

                console.log('login success');
                this.props.appState.loggedIn = true;
                this.props.appState.name = response.data.user.name;
                this.props.viewState.loginModal = false;

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user._id);
                localStorage.setItem('name', response.data.user.name);
            })
            .catch(error => {
                alert("Please enter correct email and password");
                console.log(error);
            });
    }

    render() {
        return (
            <div className="modal d-block">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div class="modal-header">
                                <h5 class="modal-title">Log In</h5>
                                <button type="button" class="close" aria-label="Close" onClick={() => { this.props.viewState.loginModal = false; }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
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
                                <button type="submit" class="btn btn-primary">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

};

export default Login;
