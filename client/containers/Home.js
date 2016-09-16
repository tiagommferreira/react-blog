import React from "react"
import {Link} from "react-router"

export default class Home extends React.Component {
    render() {
        return (
            <div>
                Home page
                
                <br/>

                <Link to="/about">About page</Link>

            </div>
        )
    }
}