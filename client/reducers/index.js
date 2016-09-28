import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

import user from "./userReducer"
import posts from "./postsReducer"

export default combineReducers({
  user,
  posts,
  routing: routerReducer
})
