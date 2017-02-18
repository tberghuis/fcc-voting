import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-modal';

import Navbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

@inject("viewState") @observer
class App extends Component {

  render() {
    return (
      <div class="container">
        <Navbar></Navbar>
        <br/><br/><br/>
        {this.props.children || <p>replace with list of polls</p>}
        {this.props.viewState.signupModal && <Signup />}
        {this.props.viewState.loginModal && <Login />}
      </div>
    );
  }

};

export default App;
