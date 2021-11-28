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

const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        alert(e.message);
    }

    console.log('Done.')
}

export { replacer, reviver, getCourses, setCourses, clearAll };