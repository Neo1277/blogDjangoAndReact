import * as ActionTypes from './ActionTypes';
import { baseUrlApiRest, apiUrl } from '../shared/baseUrl';

/* Request to Django Rest framework and show error or proceed to dispatch the data  */
export const fetchGenres = () => (dispatch) => {

    dispatch(genresLoading(true));

    return fetch(baseUrlApiRest + apiUrl + 'genres')
		.then(response => {
		  if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
		})
		.then(response => response.json())
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

  return fetch(baseUrlApiRest + apiUrl + 'posts')
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
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

  return fetch(baseUrlApiRest + apiUrl + 'featured_posts')
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
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

/* Request to Django Rest framework and show error or proceed to dispatch the data  */
export const fetchComments = () => (dispatch) => {

  dispatch(commentsLoading(true));

  return fetch(baseUrlApiRest + apiUrl + 'comments')
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)));
}

/* Call action type from comment reducer */
export const commentsLoading = () => ({
  type: ActionTypes.COMMENTS_LOADING
});

/* Call action type from comment reducer */
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

/* Call action type from comment reducer to add all comments */
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

/* Call action type from comment reducer to add one comment */
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

/**
 * Send post request to save comment
 */
export const postComment = (post, nickname, content) => (dispatch) => {

  const newComment = {
    post: post,
    content: content
  }
  const bearer = 'Bearer ' + localStorage.getItem('token');
  //console.log("comment value: "+ JSON.stringify(newComment))
  return fetch(baseUrlApiRest + apiUrl + 'comments', {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
  .then(response => {
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
    })
  .then(response => response.json())
  .then(response => dispatch(addComment(response)))
  .then(response => { console.log('Comment', response); /*alert('Thank you for your comment!\n'+JSON.stringify(response));*/ })
  .catch(error =>  { console.log('comment', error.message); /*alert('Your comment could not be posted\nError: '+error.message);*/ });
};

/**
 ***********************************************
 * Login/Logout user JSON web token requests
 ***********************************************
 */

export const requestLogin = (creds) => {
  return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
  }
}

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds))

  return fetch(baseUrlApiRest + apiUrl +  'token/', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
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
      })
  .then(response => response.json())
  .then(response => {
      if (response.access) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.access);
          localStorage.setItem('creds', JSON.stringify(creds));
          // Dispatch the success action
          dispatch(receiveLogin(response));
      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(receiveLogout())
}