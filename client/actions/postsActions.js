import axios from 'axios';


export function getPosts(token) {
  return function(dispatch) {
    axios
    axios.get("/api/posts", {headers: {'x-access-token':token}})
      .then((response) => {
        dispatch({type: "FETCH_POSTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_POSTS_REJECTED", payload: err})
      })
  }
}