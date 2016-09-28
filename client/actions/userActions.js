import axios from 'axios';

export function authenticate() {
  return function(dispatch) {
    axios.post("/api/authenticate", {"name":"Tiago Ferreira", "password":"123123"})
      .then((response) => {
        dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_USER_REJECTED", payload: err})
      })
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}