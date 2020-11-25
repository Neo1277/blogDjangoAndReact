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

  /**
   * Function for retrieving only te post
   * (Way of filter nested object)
   */
  getPostObject(genreslug, postslug){
    //console.log(JSON.stringify(this.props.genres.genres) +   ' get postobject method');
    let genre = this.props.genres.genres.filter((genre) => genre.slug === genreslug)[0]

    //console.log(JSON.stringify(genre) +   ' get postobject method');
    let postc = genre.postsgen.filter((post) => post.slug === postslug)[0]

    return postc;
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
    
    //This calls GenreContent and pass it all the properties

    const PostWithSlug = ({match}) => {
      
      return(
        <PostContent post={this.props.genres.genres.filter((genre) => genre.slug === match.params.sluggenre)[0].postsgen.filter((post) => post.slug === match.params.slugpost)[0]}
          isLoading={this.props.genres.isLoading}
          errMess={this.props.genres.errMess}
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
              <Route path='/home' component={() => <Home genres={this.props.genres} />} />
              <Route path="/genre/:slug" component={GenreWithSlug} />
              <Route path="/genres/:sluggenre/:slugpost" component={PostWithSlug} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

