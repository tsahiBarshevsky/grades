const INITIAL_STATE = 60;

const coursesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_SCORE':
            return action.score;
        default:
            return state;
    }
}

export default coursesReducer;