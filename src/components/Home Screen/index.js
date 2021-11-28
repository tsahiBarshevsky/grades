import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse, clearData } from '../../actions';
import { getCourses, setCourses, replacer, clearAll } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const HomeScreen = () => {

    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));

    const calculateGPA = () => {
        if (courses.size === 0)
            return 0;
        var weighting = 0;
        var weights = 0;
        coursesArray.forEach((course) => {
            if (course.items.grade) {
                weighting += (course.items.grade * course.items.weight);
                weights += course.items.weight;
            }
        });
        return Number(weighting / weights).toFixed(2);
    }

    const onAddNewCourse = () => {
        const newCourse = { name: 'קורס 3', grade: null, weight: 5 };
        getCourses().then((storage) => {
            var jsonMap = '';
            if (storage.size === 0) {
                const map = new Map().set(newCourse.name, newCourse);
                var jsonMap = JSON.stringify(map, replacer);
                setCourses(jsonMap); // update AsyncStorage
                dispatch(addNewCourse(newCourse)); // update store
            }
            else {
                storage.set(newCourse.name, newCourse);
                jsonMap = JSON.stringify(storage, replacer);
                setCourses(jsonMap); // update AsyncStorage
                dispatch(addNewCourse(newCourse)); // update store
                console.log("New list inserted to existing map");
            }
        });
    }

    const clear = () => {
        clearAll();
        dispatch(clearData());
    }

    useEffect(() => {
        getCourses().then((res) => {
            dispatch({ type: 'SET_COURSES', courses: res });
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => console.log(courses)}><Text>הדפס</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => onAddNewCourse()}><Text>הוסף</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => clear()}><Text>נקה</Text></TouchableOpacity>
            {coursesArray.map((course) => {
                return (
                    <Text key={course.key}>{course.items.name} - {course.items.grade} - {course.items.weight}</Text>
                )
            })}
            <Text>ממוצע: {calculateGPA(coursesArray.items)}</Text>
            <Text>נק"ז שהושלמו: </Text>
            <Text>סה"כ נק"ז: </Text>
        </SafeAreaView>
    )
}

export default HomeScreen;