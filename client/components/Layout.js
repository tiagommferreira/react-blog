import React from "react"

import Nav from "./Nav"

//import { connect } from "react-redux"

//import { fetchUser } from "../actions/userActions"

/*
@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
  };
})
*/

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
        <div>

          <Nav location={location} />
          <div class="container" style={containerStyle}>
            <div class="row">
              <div class="col-lg-12">
                {this.props.children}
              </div>
            </div>
          </div>

        </div>
    );
  }
}
