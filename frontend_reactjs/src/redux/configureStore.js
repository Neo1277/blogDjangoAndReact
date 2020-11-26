import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Genres } from './genres';
import { Posts } from './posts';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

/* Configure store for letting the data be there even if the page is reloaded */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            genres: Genres,
            posts: Posts
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}