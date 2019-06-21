import { createStore, combineReducers } from 'redux';
import { sparksReducer } from './reducers/sparks';

export const store = createStore(combineReducers({
    sparks: sparksReducer
}));