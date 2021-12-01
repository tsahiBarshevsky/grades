import React, { useRef, useContext } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { replacer, setCourses } from '../../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../../utils/ThemeManager';
import { darkTheme, lightTheme } from "../../../utils/Themes";
import { removeCourse } from '../../../actions';

const CourseCard = ({ id, course, }) => {

    const { theme } = useContext(ThemeContext);
    const swipeableRef = useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);

    const onEditCourse = () => {
        navigation.navigate("Course", { id: id });
        setTimeout(() => {
            swipeableRef.current.close();
        }, 100);
    }

    const onRemoveCourse = (id) => {
        const temp = new Map(courses);
        temp.delete(id);
        const jsonMap = JSON.stringify(temp, replacer);
        setCourses(jsonMap); // update AsyncStorage
        dispatch(removeCourse(id)); // update store
    }

    const deleteAction = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.deleteAction}>
                <TouchableOpacity onPress={() => onRemoveCourse(id)}>
                    <Animated.Text
                        style={{ color: 'white', transform: [{ scale }] }}
                    >
                        מחיקה
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }

    const editAction = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.editAction}>
                <TouchableOpacity onPress={() => onEditCourse(id)}>
                    <Animated.Text
                        style={{ color: 'white', transform: [{ scale }] }}
                    >
                        עריכה
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={deleteAction}
            renderRightActions={editAction}
            onSwipeableLeftOpen={() => onRemoveCourse(id)}
            onSwipeableRightOpen={() => onEditCourse(id)}
        >
            <View style={[styles.container, styles[`container${theme}`]]}>
                <View style={styles.nameAndWeight}>
                    <Text style={styles[`text${theme}`]}>{course.name}</Text>
                    <Text style={styles[`text${theme}`]}>{course.weight} נק"ז</Text>
                    <Text style={styles[`text${theme}`]}>סמס {course.semester}</Text>
                </View>
                <Text style={styles[`text${theme}`]}>{course.grade}</Text>
            </View>
        </Swipeable >
    )
}

export default CourseCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    containerlight: {
        backgroundColor: lightTheme.boxes,
    },
    containerdark: {
        backgroundColor: darkTheme.boxes
    },
    nameAndWeight: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textlight: {
        color: lightTheme.text
    },
    textdark: {
        color: darkTheme.text
    },
    deleteAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 5,
        marginBottom: 10,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    editAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 5,
        marginBottom: 10,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    }
})
