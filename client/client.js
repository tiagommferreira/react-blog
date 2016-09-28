import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Layout from "./components/Layout"
import Home from "./containers/Home"
import About from "./components/About"
import Login from "./components/Login"
import Profile from './components/Profile';

import store from "./store"

const app = document.getElementById('app')

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

function requireAuth(nextState, replace) {
  const user = store.getState().user.user;
  console.log(user);
  if (!user.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="login" component={Login} />
        <Route path="profile" component={Profile} onEnter={requireAuth} />
      </Route>
    </Router>
</Provider>
, app);
