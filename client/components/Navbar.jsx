import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, IndexLink } from 'react-router'

const Navlink = React.createClass({
    render() {
        return <Link {...this.props} activeClassName="active" />
    }
});

@inject("viewState", "appState") @observer
class Navbar extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.showSignupModal = this.showSignupModal.bind(this);
        this.showLoginModal = this.showLoginModal.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.appState.logout();
        this.context.router.push('/');
    }

    showSignupModal(e) {
        e.preventDefault();
        this.props.viewState.signupModal = true;
    }
    showLoginModal(e) {
        e.preventDefault();
        this.props.viewState.loginModal = true;
    }

    render() {

        let loggedIn = this.props.appState.loggedIn;

        return (
            <div>
                <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Link to="/" class="navbar-brand">FCC Voting App</Link>
                    <div class=" navbar-collapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Navlink to="/" class="nav-link" onlyActiveOnIndex={true}>All Polls</Navlink>
                            </li>
                            {loggedIn &&
                                <li class="nav-item">
                                    <Navlink to="/mypolls" class="nav-link">My Polls</Navlink>
                                </li>}
                            {loggedIn &&
                                <li class="nav-item">
                                    <Navlink to="/createpoll" class="nav-link">Create Poll</Navlink>
                                </li>
                            }
                        </ul>
                        <ul class="navbar-nav">
                            {/* this style just to get rid of key warning */}
                            {loggedIn &&
                                <li class="nav-item">
                                    <a href="#" class="nav-link" onClick={this.logout}>Logout</a>
                                </li>
                            }
                            {!loggedIn &&
                                <li class="nav-item">
                                    <a href="#" class="nav-link" onClick={this.showLoginModal}>Login</a>
                                </li>
                            }
                            {!loggedIn &&
                                <li class="nav-item">
                                    <a href="#" class="nav-link" onClick={this.showSignupModal}>Signup</a>
                                </li>
                            }
                        </ul >
                    </div >
                </nav >
            </div >
        );
    }

};

export default Navbar;
