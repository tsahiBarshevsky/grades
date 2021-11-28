export const addNewCourse = (id, newItem) => {
    return {
        type: 'ADD_NEW_COURSE',
        payload: {
            newItem: newItem,
            id: id
        }
    }
}

export const updateCourse = (key, updatedItem) => {
    return {
        type: 'UPDATE_COURSE',
        payload: {
            key: key,
            updatedItem: updatedItem
        }
    }
}

export const removeCourse = (id) => {
    return {
        type: 'REMOVE_COURSE',
        payload: id
    }
}

export const clearData = () => {
    return {
        type: 'CLEAR_DATA'
    }
}