import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/App.jsx';
import Poll from './components/Poll.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import CreatePoll from './components/CreatePoll.jsx';
import AppState from './stores/AppState.jsx';
import ViewState from './stores/ViewState.jsx';

const appState = new AppState();
const viewState = new ViewState();

const state = {appState, viewState};


// for debugging
window.state = state;

function requireAuth(nextState, replace) {
  if (!appState.loggedIn) {
    replace({
      pathname: '/'
    })
  }
}




render(
  (
    <Provider {...state}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          { /* <IndexRoute component={Form} /> */ }
          { /* remove auth routes replace with modals */ }
          <Route path="createpoll" component={CreatePoll} onEnter={requireAuth} />
          <Route path="/poll/:pollId" component={Poll} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);

/*
<Router history={browserHistory}>
  <Route path="/" component={App}>
    //<Route path="au" component={About} />
    <Route path="users" component={Users}>
      <Route path="/user/:userId" component={User} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
</Router>

*/