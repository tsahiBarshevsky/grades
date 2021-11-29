import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CourseCard = ({ course }) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameAndWeight}>
                <Text>{course.name}</Text>
                <Text>{course.weight} נק"ז</Text>
            </View>
            <Text>{course.grade}</Text>
        </View>
    )
}

export default CourseCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    nameAndWeight: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});
