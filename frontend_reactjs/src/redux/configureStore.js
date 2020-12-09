import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { Genres } from './genres';
import { Posts } from './posts';
import { FeaturedPosts } from './featuredPosts';
import { InitialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

/* Configure store for letting the data be there even if the page is reloaded */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            genres: Genres,
            posts: Posts,
            featuredposts: FeaturedPosts,
            ...createForms({
                comment: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}