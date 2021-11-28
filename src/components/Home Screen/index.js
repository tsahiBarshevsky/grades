import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, removeCourse } from '../../actions';
import { getCourses, clearAll, replacer, setCourses } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const HomeScreen = ({ navigation }) => {

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

    const calculateAllPoints = () => {
        if (courses.size === 0)
            return 0;
        var sum = 0;
        courses.forEach((course) => sum += course.weight);
        return sum;
    }

    const calculateCompletedPoints = () => {
        if (courses.size === 0)
            return 0;
        var sum = 0;
        courses.forEach((course) => {
            if (course.grade && course.grade >= 60)
                sum += course.weight;
        });
        return sum;
    }

    const onRemoveCourse = (id) => {
        const temp = new Map(courses);
        temp.delete(id);
        const jsonMap = JSON.stringify(temp, replacer);
        setCourses(jsonMap); // update AsyncStorage
        dispatch(removeCourse(id)); // update store
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
            <View style={styles.header}>
                <View style={styles.stat}>
                    <Text>{calculateGPA()}</Text>
                    <Text>ממוצע</Text>
                </View>
                <View style={styles.stat}>
                    <Text>{calculateAllPoints()}</Text>
                    <Text>סה"כ נק"ז</Text>
                </View>
                <View style={styles.stat}>
                    <Text>{calculateCompletedPoints()}</Text>
                    <Text>נק"ז שהושלמו</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity onPress={() => console.log(courses)}><Text>הדפס</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Insertion')}><Text>הוסף</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => clear()}><Text>נקה</Text></TouchableOpacity>
                {coursesArray.map((course) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Course", { id: course.key })}
                            onLongPress={() => onRemoveCourse(course.key)}
                            key={course.key}
                            style={{ marginTop: 15, backgroundColor: 'lightgreen' }}
                        >
                            <Text>{course.items.name}</Text>
                            <Text>ציון: {course.items.grade}</Text>
                            <Text>משקל: {course.items.weight}</Text>
                            <Text>סמסטר {course.items.semester} שנה {course.items.year}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;