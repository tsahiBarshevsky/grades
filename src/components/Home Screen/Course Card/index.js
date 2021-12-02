import React, { useRef, useContext } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { replacer, setCourses } from '../../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../../utils/ThemeManager';
import { darkTheme, lightTheme } from "../../../utils/Themes";
import { removeCourse } from '../../../actions';

const CourseCard = ({ id, course }) => {

    const { theme } = useContext(ThemeContext);
    const swipeableRef = useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);
    const score = useSelector(state => state.score);

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
                <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
                    <MaterialIcons name="delete" size={20} color="white" />
                    <Text style={styles.text}>מחיקה</Text>
                </Animated.View>
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
                <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
                    <MaterialIcons name="edit" size={20} color="white" />
                    <Text style={styles.text}>עריכה</Text>
                </Animated.View>
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
                <View
                    style={[
                        styles.line,
                        (course.grade >= 0 && course.grade < score) ?
                            styles[`red${theme}`]
                            :
                            styles[`green${theme}`]]}
                />
                <View style={styles.data}>
                    <View style={styles.nameAndWeight}>
                        <Text style={styles[`text${theme}`]}>{course.name}</Text>
                        <Text style={styles[`text${theme}`]}>{course.weight} נק"ז</Text>
                        <Text style={styles[`text${theme}`]}>סמסטר {course.semester}</Text>
                    </View>
                    <Text style={styles[`text${theme}`]}>{course.grade}</Text>
                </View>
            </View>
        </Swipeable >
    )
}

export default CourseCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    containerlight: {
        backgroundColor: lightTheme.boxes,
    },
    containerdark: {
        backgroundColor: darkTheme.boxes
    },
    line: {
        width: 7,
        height: '100%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    redlight: {
        backgroundColor: lightTheme.red
    },
    reddark: {
        backgroundColor: darkTheme.red
    },
    greenlight: {
        backgroundColor: lightTheme.green
    },
    greendark: {
        backgroundColor: darkTheme.green
    },
    data: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 20
    },
    nameAndWeight: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    text: {
        color: 'white'
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
    },
    wrapper: {
        alignItems: 'center'
    }
})
