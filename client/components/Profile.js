import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class Profile extends Component {
    render() {
        const { user } = this.props; 
        return (
            <div>
                {user.name}
            </div>
        )
    }
};
