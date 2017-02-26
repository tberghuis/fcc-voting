import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/App.jsx';
import Poll from './components/Poll.jsx';
import PollResults from './components/PollResults.jsx';
import AllPolls from './components/AllPolls.jsx';
import MyPolls from './components/MyPolls.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import CreatePoll from './components/CreatePoll.jsx';
import AppState from './stores/AppState.jsx';
import ViewState from './stores/ViewState.jsx';

// don't need the varible style, is there another cleaner way
// to get webpack to build scss
import style from './scss/style.scss';

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
          
          { <IndexRoute component={AllPolls} /> }
          <Route path="createpoll" component={CreatePoll} onEnter={requireAuth} />
          <Route path="mypolls" component={MyPolls} onEnter={requireAuth} />
          <Route path="/poll/:pollId" component={Poll} />
          <Route path="/poll/:pollId/results" component={PollResults} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
