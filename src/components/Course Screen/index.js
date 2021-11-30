import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, TextInput } from 'react-native';
import update from 'immutability-helper';
import { useSelector, useDispatch } from 'react-redux';
import { updateCourse } from '../../actions';
import { replacer, setCourses } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const CourseScreen = ({ navigation, route }) => {

    const [name, setName] = useState('');
    const [weight, setWeight] = useState(null);
    const [grade, setGrade] = useState(null);
    const [semester, setSemester] = useState('א');
    const [year, setYear] = useState('');
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const { id } = route.params;

    const onUpdateCourse = () => {
        const updatedCourse = { name: name, weight: Number(weight), grade: Number(grade), semester: semester, year: year };
        const temp = new Map(courses);
        const updatedMap = update(temp, { [id]: { $set: updatedCourse } });
        const jsonMap = JSON.stringify(updatedMap, replacer);
        setCourses(jsonMap); // update AsyncStorage
        dispatch(updateCourse(id, updatedCourse)); // update store
        navigation.navigate('Home');
    }

    useEffect(() => {
        const course = courses.get(id);
        setName(course.name);
        setWeight(course.weight);
        setGrade(course.grade);
        setYear(course.year);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>עריכה</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="שם הקורס"
            />
            <TextInput
                value={weight ? weight.toString() : ''}
                onChangeText={setWeight}
                placeholder='נק"ז'
                keyboardType="number-pad"
            />
            <TextInput
                value={grade ? grade.toString() : ''}
                onChangeText={setGrade}
                placeholder='ציון'
                keyboardType="number-pad"
            />
            <TouchableOpacity onPress={() => onUpdateCourse()}>
                <Text>עדכן</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CourseScreen;

