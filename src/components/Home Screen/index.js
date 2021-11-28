import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse, clearData } from '../../actions';
import { getCourses, setCourses, replacer, clearAll } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const HomeScreen = () => {

    const [points, setPoints] = useState({ allPoints: 0, completedPoints: 0 });
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));

    const calculateGPA = () => {
        if (courses.size === 0)
            return 0;
        var weighting = 0;
        var weights = 0;
        courses.forEach((course) => {
            if (course.grade) {
                weighting += (course.grade * course.weight);
                weights += course.weight;
            }
        });
        return Number(weighting / weights).toFixed(2);
    }

    const calculatePointsData = () => {
        if (courses.size === 0)
            return { allPoints: 0, completedPoints: 0 };
        var allPoints = 0;
        var completedPoints = 0;
        courses.forEach((course) => {
            if (course.grade && course.grade >= 60)
                completedPoints += course.weight;
            allPoints += course.weight;
        });
        return { allPoints: allPoints, completedPoints: completedPoints };
    }

    const onAddNewCourse = () => {
        const newCourse = { name: 'ציון נכשל', grade: 52, weight: 5 };
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
            }
        });
    }

    const clear = () => {
        clearAll();
        dispatch(clearData());
        setPoints({ allPoints: 0, completedPoints: 0 });
    }

    useEffect(() => {
        getCourses().then((res) => {
            dispatch({ type: 'SET_COURSES', courses: res });
            setPoints(calculatePointsData());
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
            <View style={{ marginTop: 15 }}>
                <Text>ממוצע: {calculateGPA(coursesArray.items)}</Text>
                <Text>נק"ז שהושלמו: {points.completedPoints}</Text>
                <Text>סה"כ נק"ז: {points.allPoints}</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;