import update from 'immutability-helper';

const INITIAL_STATE = new Map();

const coursesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_COURSES':
            return action.courses;
        case 'ADD_NEW_COURSE':
            const newItem = action.payload;
            const newMap = update(state, {
                $add: [
                    [newItem.name, newItem]
                ]
            });
            return newMap;
        case 'CLEAR_DATA':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default coursesReducer;