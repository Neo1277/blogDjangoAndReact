import React, { Component } from 'react';
import Home from './HomeComponent';
import GenreContent from './GenreComponent';
import PostContent from './PostComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGenres } from '../redux/ActionCreators';

/* Set data obtain from json-server with redux to the Cpmponent's props */
const mapStateToProps = state => {
  return{
    genres: state.genres
  }
}

/* Set functions from ActionCreators redux to the Cpmponent's props and dispatch */
const mapDispatchToProps = (dispatch) => ({
  fetchGenres: () => { dispatch(fetchGenres())}
});


class Main extends Component {

  //Execute this before render
  componentDidMount() {
    this.props.fetchGenres();
  }

  render(){

    
    //This calls GenreContent and pass it all the properties
    const GenreWithId = ({match}) => {
      return(
        <GenreContent genre={this.props.genres.genres.filter((genre) => genre.slug === match.params.slug)[0]}
          isLoading={this.props.genres.isLoading}
          errMess={this.props.genres.errMess}
        />
      );
    };
    
    //This calls GenreContent and pass it all the properties
    const PostWithId = ({match}) => {
      return(
        <PostContent genre={this.props.genres.genres.filter((genre)  =>  genre.postsgen.filter((postsgen) => postsgen.slug === match.params.slug )[0]  )[0] }
          isLoading={this.props.genres.isLoading}
          errMess={this.props.genres.errMess}
        />
      );
    };
    /*
    const PostWithId = ({match}) => {
      return(
        <PostContent genre={this.props.genres.genres.filter((genre)  => genre.postsgen.filter((postsgen) => postsgen.slug === match.params.slug )[0] )[0]}
          isLoading={this.props.genres.isLoading}
          errMess={this.props.genres.errMess}
        />
      );
    };

    const PostWithId = ({match}) => {
      return(
        <PostContent genre={this.props.genres.genres.filter((genre)  => genre.postsgen.slug === match.params.slug)[0]}
          isLoading={this.props.genres.isLoading}
          errMess={this.props.genres.errMess}
        />
      );
    };*/

    //alert(JSON.stringify(this.props.genres.genres  ));
    /**
     * Set routes to open the differen pages calling the componets
     * And redirect to home if the url that the user type in the browser
     * does not match with any url from here
     */

    return (
      <div>
        <Header />
          <div className="mainContainer">
            <Switch>
              <Route path='/home' component={() => <Home genres={this.props.genres} />} />
              <Route path="/genre/:slug" component={GenreWithId} />
              <Route path="/post/:slug" component={PostWithId} />
              <Redirect to="/home" />
          </Switch>
          </div>
        <Footer />
      </div>
      /*
      <div>
        <Header />
          <div className="mainContainer">
            <Switch>
              <Route path='/home' component={() => <Home genres={this.props.genres} />} />
              <Route path="/:slug" component={GenreWithId} />
              <Route path="/post/:slug" component={PostWithId} />
              <Redirect to="/home" />
          </Switch>
          </div>
        <Footer />
      </div>
      */
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

