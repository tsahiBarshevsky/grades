import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../utils/ThemeManager';
import CourseCard from './Course Card';
import { styles } from './styles';

const { width } = Dimensions.get("window");

const HomeScreen = () => {

    const courses = useSelector(state => state.courses);
    const { theme } = useContext(ThemeContext);
    // Convert courses map into array
    const coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));
    // Group courses array by year
    const groups = Array.from(courses, ([key, items]) => ({ key, items })).reduce((group, course) => {
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
                if (course.grade || course.grade === 0) {
                    weighting += (course.grade * course.weight);
                    weights += course.weight;
                }
            });
        }
        else {
            map.forEach((course) => {
                if (course.items.grade || course.items.grade === 0) {
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

    const sortBySemesters = (a, b) => {
        return (a.items.semester > b.items.semester) ? 1 : ((b.items.semester > a.items.semester) ? -1 : 0);
    }

    return courses.size > 0 ? (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
            <View style={styles.header}>
                <View style={[styles.statBox, styles[`statBox${theme}`]]}>
                    <Text style={[styles[`text${theme}`], styles.statValue, styles[`statValue${theme}`]]}>
                        {calculateGPA(courses, 'general')}
                    </Text>
                    <Text style={[styles[`text${theme}`], styles.statCaption]}>
                        ממוצע מצטבר
                    </Text>
                </View>
                <View style={[styles.statBox, styles[`statBox${theme}`]]}>
                    <Text style={[styles[`text${theme}`], styles.statValue, styles[`statValue${theme}`]]}>
                        {calculateCompletedPoints()}
                    </Text>
                    <Text style={[styles[`text${theme}`], styles.statCaption]}>
                        נק"ז שהושלמו
                    </Text>
                </View>
                <View style={[styles.statBox, styles[`statBox${theme}`]]}>
                    <Text style={[styles[`text${theme}`], styles.statValue, styles[`statValue${theme}`]]}>
                        {calculateAllPoints()}
                    </Text>
                    <Text style={[styles[`text${theme}`], styles.statCaption]}>
                        סה"כ נק"ז
                    </Text>
                </View>
            </View>
            <ScrollView horizontal decelerationRate="fast" snapToInterval={width} showsHorizontalScrollIndicator={false} style={{ width: width }}>
                {Object.keys(groups).reverse().map((year, index) => {
                    return (
                        <View key={index} style={{ flex: 1, width: width, alignSelf: 'stretch' }}>
                            <View style={[styles.titleBox, styles[`titleBox${theme}`]]}>
                                <Text style={[styles.title, styles[`title${theme}`]]}>{year}</Text>
                            </View>
                            <ScrollView style={{ paddingHorizontal: 15 }}>
                                {groups[year].sort(sortBySemesters).map((course) => {
                                    return (
                                        <CourseCard
                                            key={course.key}
                                            id={course.key}
                                            course={course.items}
                                        />
                                    )
                                })}
                            </ScrollView>
                            <View style={styles.gpa}>
                                <Text style={[styles[`text${theme}`], { fontFamily: 'VarelaRound' }]}>
                                    ממוצע שנתי: {calculateGPA(groups[year], 'annual')}
                                </Text>
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
        </SafeAreaView >
    ) : (
        <SafeAreaView style={[styles.messageContainer, styles[`container${theme}`], styles.center]}>
            <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
            <Image
                source={require('../../../assets/Exam.png')}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={[styles.text, styles[`text${theme}`]]}>
                אחרי שמוסיפים את הקורס הראשון, כל המידע הרלוונטי לך יוצג כאן
            </Text>
        </SafeAreaView>
    )
}

export default HomeScreen;