import AsyncStorage from '@react-native-async-storage/async-storage';

function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries())
        }
    }
    else {
        return value;
    }
}

function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

const getCourses = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@courses');
        return jsonValue != null ? JSON.parse(jsonValue, reviver) : new Map();
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

const setCourses = async (map) => {
    try {
        await AsyncStorage.setItem('@courses', map);
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

const clearAllCourses = async () => {
    try {
        await AsyncStorage.removeItem('@courses');
        return true;
    } catch (e) {
        alert(e.message);
        return false;
    }

    console.log('Done.')
}

const getTheme = async () => {
    try {
        const theme = await AsyncStorage.getItem('@theme');
        return theme != null ? theme : 'light';
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

const setTheme = async (theme) => {
    try {
        await AsyncStorage.setItem('@theme', theme);
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

const getFailure = async () => {
    try {
        const failure = await AsyncStorage.getItem('@failure');
        return failure != null ? Number(failure) : 60;
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

const setFailure = async (failure) => {
    try {
        await AsyncStorage.setItem('@failure', failure)
    }
    catch (e) {
        alert("An unknown error occurred.");
    }
}

export {
    replacer,
    reviver,
    getCourses,
    setCourses,
    clearAllCourses,
    getTheme,
    setTheme,
    getFailure,
    setFailure
};