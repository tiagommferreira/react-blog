import React from 'react';
import { connect } from "react-redux"
import { authenticate } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class Login extends React.Component {
    
    componentWillMount() {
        this.props.dispatch(authenticate());
        console.log(this.props);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Updated component");
        this.props.history.push("/profile");
    }

    render() {
        const { user } = this.props;

        if(user.token) {
            return (
                <div>
                    User:
                    <br/>
                    {user.token}
                </div>
            )
        }
        else {
            return(
                <div>
                    Login Page
                </div>
            )
            
        }

        
    }
};
