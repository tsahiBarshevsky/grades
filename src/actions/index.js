export const addNewCourse = (id, newItem) => {
    return {
        type: 'ADD_NEW_COURSE',
        payload: {
            newItem: newItem,
            id: id
        }
    }
}

export const clearData = () => {
    return {
        type: 'CLEAR_DATA'
    }
}