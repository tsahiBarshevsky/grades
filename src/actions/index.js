export const addNewCourse = (newItem) => {
    return {
        type: 'ADD_NEW_COURSE',
        payload: newItem
    }
}

export const clearData = () => {
    return {
        type: 'CLEAR_DATA'
    }
}