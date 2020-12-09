import * as ActionTypes from './ActionTypes';
import PostDataService from "../services/postservice";

/* Request to Django Rest API and show error or proceed to dispatch the data  */
export const fetchGenres = () => (dispatch) => {

    dispatch(genresLoading(true));

    return PostDataService.getAllGenres()
		/*.then(response => {
		  if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
		})*/
		.then(response => response.data)
    .then(genres => dispatch(addGenres(genres)))
    .catch(error => dispatch(genresFailed(error.message)));
}

/* Call action type from genre reducer */
export const genresLoading = () => ({
    type: ActionTypes.GENRES_LOADING
});

/* Call action type from genre reducer */
export const genresFailed = (errmess) => ({
    type: ActionTypes.GENRES_FAILED,
    payload: errmess
});

/* Call action type from genre reducer */
export const addGenres = (genres) => ({
    type: ActionTypes.ADD_GENRES,
    payload: genres
});

/* Request to Django Rest framework and show error or proceed to dispatch the data  */
export const fetchPosts = () => (dispatch) => {

  dispatch(postsLoading(true));

  return PostDataService.getAllPosts()
  /*.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })*/
  .then(response => response.data)
  .then(posts => dispatch(addPosts(posts)))
  .catch(error => dispatch(postsFailed(error.message)));
}

/* Call action type from post reducer */
export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING
});

/* Call action type from post reducer */
export const postsFailed = (errmess) => ({
  type: ActionTypes.POSTS_FAILED,
  payload: errmess
});

/* Call action type from post reducer */
export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts
});


/* Request to Django Rest framework and show error or proceed to dispatch the data  */
export const fetchFeaturedPosts = () => (dispatch) => {

  dispatch(featuredpostsLoading(true));

  return PostDataService.getFeaturedPosts()
  /*.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })*/
  .then(response => response.data)
  .then(featuredposts => dispatch(addFeaturedPosts(featuredposts)))
  .catch(error => dispatch(featuredpostsFailed(error.message)));
}

/* Call action type from post reducer */
export const featuredpostsLoading = () => ({
  type: ActionTypes.FEATUREDPOSTS_LOADING
});

/* Call action type from post reducer */
export const featuredpostsFailed = (errmess) => ({
  type: ActionTypes.FEATUREDPOSTS_FAILED,
  payload: errmess
});

/* Call action type from post reducer */
export const addFeaturedPosts = (featuredposts) => ({
  type: ActionTypes.ADD_FEATUREDPOSTS,
  payload: featuredposts
});

/**
 * Send post request to save comment
 */
export const postComment = (post, nickname, content) => (dispatch) => {

  const newComment = {
    post: post,
    nickname: nickname,
    content: content
  }
  //console.log("comment value: "+ JSON.stringify(newComment))
  return PostDataService.saveComment(newComment)
  /*.then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })*/
  .then(response => response.data)
  .then(response => { console.log('Comment', response); alert('Thank you for your comment!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('comment', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};