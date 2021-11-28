import coursesReducer from './courses';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    courses: coursesReducer
});

export default rootReducer;