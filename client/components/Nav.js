import React from "react"
import { IndexLink, Link } from "react-router";
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
        collapsed: true,
        };
    }
    
    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    render() {
        const { location, user } = this.props;
        const { collapsed } = this.state;
        const homeClass = location.pathname === "/" ? "active" : "";
        const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
        const loginClass = location.pathname.match(/^\/login/) ? "active" : "";        
        const profileClass = location.pathname.match(/^\/profile/) ? "active" : "";        
        const navClass = collapsed ? "collapse" : "";

        return (
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <IndexLink class="navbar-brand" to="/">Blog</IndexLink>
                </div>
                <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class={homeClass}>
                            <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
                        </li>
                        <li class={aboutClass}>
                            <Link to="/about" onClick={this.toggleCollapse.bind(this)}>About</Link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        {(() => {
                            if(user.token != null) {
                                return (
                                    <li class={profileClass}>
                                        <Link to="/profile" onClick={this.toggleCollapse.bind(this)}>Profile</Link>
                                    </li>
                                )
                            }
                            else {
                                return(
                                    <li class={loginClass}>
                                        <Link to="/login" onClick={this.toggleCollapse.bind(this)}>Login</Link>
                                    </li>
                                )
                                
                            }
                        })()}
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
}