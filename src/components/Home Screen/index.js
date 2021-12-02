import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../../actions';
import { getCourses, clearAll, getFailure } from '../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../utils/ThemeManager';
import CourseCard from './Course Card';
import { styles } from './styles';

const HomeScreen = ({ navigation }) => {

    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    // Convert courses map into array
    const coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));
    // Group courses array by year
    const groups = coursesArray.reduce((group, course) => {
        if (!group[course.items.year])
            group[course.items.year] = [];
        group[course.items.year].push(course);
        return group;
    }, {});

    const calculateGPA = (map, source) => {
        if (map.size === 0)
            return 0;
        var weighting = 0;
        var weights = 0;
        if (source === 'general') {
            map.forEach((course) => {
                if (course.grade) {
                    weighting += (course.grade * course.weight);
                    weights += course.weight;
                }
            });
        }
        else {
            map.forEach((course) => {
                if (course.items.grade) {
                    weighting += (course.items.grade * course.items.weight);
                    weights += course.items.weight;
                }
            });
        }
        return weighting !== 0 && weights !== 0 ? Number(weighting / weights).toFixed(2) : 0;
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

    const clear = () => {
        clearAll();
        dispatch(clearData());
    }

    const sortBySemesters = (a, b) => {
        return (a.items.semester > b.items.semester) ? 1 : ((b.items.semester > a.items.semester) ? -1 : 0);
    }

    useEffect(() => {
        getFailure().then((res) => {
            if (res !== null)
                dispatch({ type: 'SET_SCORE', score: res });
        });
        getCourses().then((res) => {
            dispatch({ type: 'SET_COURSES', courses: res });
        });
    }, []);

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
            <View style={styles.header}>
                <View style={[styles.statBox, styles[`statBox${theme}`]]}>
                    <Text style={styles[`text${theme}`]}>{calculateGPA(courses, 'general')}</Text>
                    <Text style={styles[`text${theme}`]}>ממוצע מצטבר</Text>
                </View>
                <View style={[styles.statBox, styles[`statBox${theme}`]]}>
                    <Text style={styles[`text${theme}`]}>{calculateCompletedPoints()}</Text>
                    <Text style={styles[`text${theme}`]}>נק"ז שהושלמו</Text>
                </View>
                <View style={[styles.statBox, styles[`statBox${theme}`]]}>
                    <Text style={styles[`text${theme}`]}>{calculateAllPoints()}</Text>
                    <Text style={styles[`text${theme}`]}>סה"כ נק"ז</Text>
                </View>
            </View>
            {/* <TouchableOpacity onPress={() => console.log(courses)}><Text>הדפס</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Insertion')}><Text>הוסף</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => clear()}><Text>נקה</Text></TouchableOpacity> */}
            <Swiper loop={false} showsPagination={false}>
                {Object.keys(groups).map((year, index) => {
                    return (
                        <View key={index}>
                            <ScrollView style={styles.yearContainer}>
                                <View style={[styles.titleBox, styles[`titleBox${theme}`]]}>
                                    <Text style={styles[`title${theme}`]}>{year}</Text>
                                </View>
                                {groups[year].sort(sortBySemesters).map((course) => {
                                    return (
                                        <CourseCard
                                            key={course.key}
                                            id={course.key}
                                            course={course.items}
                                        />
                                    )
                                })}
                                <Text style={styles[`text${theme}`]}>
                                    ממוצע שנתי {calculateGPA(groups[year], 'annual')}
                                </Text>
                            </ScrollView>
                        </View>
                    )
                })}
            </Swiper>
        </SafeAreaView>
    )
}

export default HomeScreen;