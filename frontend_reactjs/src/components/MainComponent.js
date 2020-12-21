import React, { Component } from 'react';
import Home from './HomeComponent';
import GenreContent from './GenreComponent';
import PostContent from './PostComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGenres, fetchPosts, fetchFeaturedPosts, fetchComments, postComment } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

/* Set data gotten from Django API with redux to the Cpmponent's props */
const mapStateToProps = state => {
  return{
    genres: state.genres,
    posts: state.posts,
    featuredposts: state.featuredposts,
    comments: state.comments
  }
}

/* Set functions from ActionCreators redux to the Cpmponent's props and dispatch */
const mapDispatchToProps = (dispatch) => ({
  fetchGenres: () => { dispatch(fetchGenres())},
  fetchPosts: () => { dispatch(fetchPosts())},
  fetchFeaturedPosts: () => { dispatch(fetchFeaturedPosts())},
  fetchComments: () => { dispatch(fetchComments())},
  resetCommentForm: () => { dispatch(actions.reset('comment'))},
  postComment: (post, nickname, content) => dispatch(postComment(post, nickname, content)),
});


class Main extends Component {

  //Execute this before render
  componentDidMount() {
    this.props.fetchGenres();
    this.props.fetchPosts();
    this.props.fetchFeaturedPosts();
    this.props.fetchComments();
  }

  render(){

    //This calls GenreContent and pass it all the properties
    const GenreWithSlug = ({match}) => {
      return(
        <GenreContent genre={this.props.genres.genres.filter((genre) => genre.slug === match.params.slug)[0]}
          isLoading={this.props.genres.isLoading}
          errMess={this.props.genres.errMess}
        />
      );
    };
    
    //This calls PostContent and pass it all the properties
    const PostWithSlug = ({match}) => {
      //console.log("comment value: "+ JSON.stringify(this.props.comments.comments+ ' Comments props'))
      return(
        <PostContent post={this.props.posts.posts.filter((post) => post.slug === match.params.slugpost)[0]}
          postisLoading={this.props.posts.isLoading}
          posterrMess={this.props.posts.errMess}
          comments={this.props.comments.comments}
          commentsisLoading={this.props.comments.isLoading}
          commentserrMess={this.props.comments.errMess}
          resetCommentForm={this.props.resetCommentForm} 
          postComment={this.props.postComment} 
        />
      );
    };

    /**
     * Set routes to open the differen pages calling the components
     * And redirect to home if the url that the user type in the browser
     * does not match with any url from here
     */

    return (
      <div>
        <Header />
            <Switch>
              <Route path='/home' component={() => <Home genres={this.props.genres} featuredposts={this.props.featuredposts} posts={this.props.posts} />} />
              <Route path="/genre/:slug" component={GenreWithSlug} />
              <Route path="/post/:slugpost" component={PostWithSlug} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

