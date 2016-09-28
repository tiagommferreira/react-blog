import React from "react"
import {Link} from "react-router"
import { connect } from "react-redux"
import { getPosts } from '../actions/postsActions';


@connect((store) => {
  return {
    user: store.user.user,
    posts: store.posts.posts,
  };
})
export default class Home extends React.Component {
    componentWillMount() {
        const { user } = this.props; 
        if(user.token != null) {
            this.props.dispatch(getPosts(user.token));
        }
    }

    render() {
        const { posts } = this.props;
        if(!posts.length) {
            return (
                <div>
                    Home page
                    
                    <br/>

                    <Link to="/about">About page</Link>

                </div>
            )
        }
        else {
            const mappedPosts = posts.map(post => <div key={post._id}><h2>{post.title}</h2><h3>{post.content}</h3></div>)
            return (
                <div>
                    {mappedPosts}
                </div>
            )
        }
        
    }
}