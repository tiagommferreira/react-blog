import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
  };
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  render() {
    return (
        <div>
            {this.props.children}
        </div>
    );
  }
}
