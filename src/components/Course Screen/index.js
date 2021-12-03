import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import update from 'immutability-helper';
import { useSelector, useDispatch } from 'react-redux';
import { updateCourse } from '../../actions';
import { replacer, setCourses } from '../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../utils/ThemeManager';
import { styles } from './styles';
import { darkTheme, lightTheme } from '../../utils/Themes';

const CourseScreen = ({ navigation, route }) => {

    const [name, setName] = useState('');
    const [weight, setWeight] = useState(null);
    const [grade, setGrade] = useState(null);
    const [semester, setSemester] = useState('א');
    const [year, setYear] = useState('');
    const weightRef = useRef(null);
    const gradeRef = useRef(null);
    const yearRef = useRef(null);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const { id } = route.params;

    const onUpdateCourse = () => {
        const updatedCourse = {
            name: name,
            weight: Number(weight),
            grade: grade !== '' ? Number(grade) : null,
            semester: semester,
            year: year
        };
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
        setSemester(course.semester);
        setYear(course.year);
    }, []);

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <Text style={theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }}>שם הקורס</Text>
                    <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="שם הקורס..."
                            placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            returnKeyType='next'
                            onSubmitEditing={() => weightRef.current.focus()}
                            style={[styles.textInput, styles[`textInput${theme}`]]}
                            blurOnSubmit={false}
                        />
                    </View>
                    <Text style={theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }}>נק"ז</Text>
                    <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                        <TextInput
                            value={weight ? weight.toString() : ''}
                            onChangeText={setWeight}
                            keyboardType="number-pad"
                            placeholder='נק"ז...'
                            placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            ref={weightRef}
                            returnKeyType='next'
                            onSubmitEditing={() => gradeRef.current.focus()}
                            style={[styles.textInput, styles[`textInput${theme}`]]}
                            blurOnSubmit={false}
                        />
                    </View>
                    <Text style={theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }}>ציון</Text>
                    <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                        <TextInput
                            value={grade ? grade.toString() : ''}
                            onChangeText={setGrade}
                            keyboardType="number-pad"
                            placeholder='ציון... (ניתן להשאיר ריק)'
                            placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            ref={gradeRef}
                            returnKeyType='next'
                            onSubmitEditing={() => yearRef.current.focus()}
                            style={[styles.textInput, styles[`textInput${theme}`]]}
                            blurOnSubmit={false}
                        />
                    </View>
                    <Text style={theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }}>שנה</Text>
                    <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                        <TextInput
                            value={year ? year.toString() : ''}
                            onChangeText={setYear}
                            keyboardType="number-pad"
                            placeholder='שנה...'
                            placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                            ref={yearRef}
                            style={[styles.textInput, styles[`textInput${theme}`]]}
                        />
                    </View>
                    <Text style={theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }}>סמסטר</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={radio_props.map((e) => e.label).indexOf(courses.get(id).semester)}
                        onPress={(value) => setSemester(value)}
                        buttonColor={theme === 'light' ? lightTheme.title : darkTheme.title}
                        buttonSize={12}
                        selectedButtonColor={theme === 'light' ? lightTheme.title : darkTheme.title}
                        selectedLabelColor={theme === 'light' ? lightTheme.text : darkTheme.text}
                        labelColor={theme === 'light' ? lightTheme.text : darkTheme.text}
                        labelStyle={{ marginLeft: 10, fontSize: 16 }}
                        style={styles.radioForm}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => onUpdateCourse()}
                        style={[styles.button, styles[`button${theme}`]]}
                    >
                        <Text style={styles[`text${theme}`]}>עדכון</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

var radio_props = [
    { label: "א'", value: "א'" },
    { label: "ב'", value: "ב'" },
    { label: "ג'", value: "ג'" },
];

export default CourseScreen;

