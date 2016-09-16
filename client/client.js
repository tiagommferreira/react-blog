import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Layout from "./components/Layout"
import Home from "./containers/Home"
import About from "./components/About"

import store from "./store"

const app = document.getElementById('app')

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
      </Route>
    </Router>
</Provider>
, app);
