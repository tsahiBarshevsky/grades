import coursesReducer from './courses';
import scoreReducer from './score';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    courses: coursesReducer,
    score: scoreReducer
});

export default rootReducer;