import { combineReducers } from 'redux';
import state from './state';
import questions from './questions';

export default combineReducers({
    state,
    questions
});
