import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import update from 'immutability-helper';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { CourseSchema } from '../../utils/CourseSchema';
import { replacer, setCourses } from '../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../utils/ThemeManager';
import { updateCourse } from '../../actions';
import { styles } from './styles';
import { darkTheme, lightTheme } from '../../utils/Themes';

const CourseScreen = ({ navigation, route }) => {

    const [semester, setSemester] = useState('א');
    const weightRef = useRef(null);
    const gradeRef = useRef(null);
    const yearRef = useRef(null);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const { id } = route.params;

    const onUpdateCourse = (updatedCourse) => {
        updatedCourse.weight = Number(updatedCourse.weight);
        updatedCourse.grade = updatedCourse.grade ? Number(updatedCourse.grade) : null;
        updatedCourse.semester = semester;
        const temp = new Map(courses);
        const updatedMap = update(temp, { [id]: { $set: updatedCourse } });
        const jsonMap = JSON.stringify(updatedMap, replacer);
        setCourses(jsonMap); // update AsyncStorage
        dispatch(updateCourse(id, updatedCourse)); // update store
        navigation.navigate('Home');
    }

    useEffect(() => {
        setSemester(courses.get(id).semester);
    }, []);

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={styles.back}>
                        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-small-right" size={30} color={theme === 'light' ? '#000000' : '#ffffff'} />
                        </TouchableOpacity>
                        <Text style={[styles.mainTitle, styles[`mainTitle${theme}`]]}>
                            עריכת קורס
                        </Text>
                    </View>
                    <Formik
                        initialValues={{
                            name: courses.get(id).name,
                            weight: courses.get(id).weight.toString(),
                            grade: courses.get(id).grade ? courses.get(id).grade.toString() : '',
                            year: courses.get(id).year
                        }}
                        // validateOnBlur={false}
                        // validateOnChange={false}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            onUpdateCourse(values);
                            resetForm();
                        }}
                        validationSchema={CourseSchema}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
                                <Text style={[styles.label, styles[`label${theme}`]]}>שם הקורס</Text>
                                <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                                    <TextInput
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="שם הקורס..."
                                        placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        returnKeyType='next'
                                        onSubmitEditing={() => weightRef.current.focus()}
                                        style={[styles.textInput, styles[`textInput${theme}`]]}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('name')}
                                    />
                                </View>
                                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                                <Text style={[styles.label, styles[`label${theme}`]]}>נק"ז</Text>
                                <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                                    <TextInput
                                        value={values.weight}
                                        onChangeText={handleChange('weight')}
                                        keyboardType="number-pad"
                                        placeholder='נק"ז...'
                                        placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        ref={weightRef}
                                        returnKeyType='next'
                                        onSubmitEditing={() => gradeRef.current.focus()}
                                        style={[styles.textInput, styles[`textInput${theme}`]]}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('weight')}
                                    />
                                </View>
                                {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}
                                <Text style={[styles.label, styles[`label${theme}`]]}>ציון</Text>
                                <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                                    <TextInput
                                        value={values.grade}
                                        onChangeText={handleChange('grade')}
                                        keyboardType="number-pad"
                                        placeholder='ציון... (ניתן להשאיר ריק)'
                                        placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        ref={gradeRef}
                                        returnKeyType='next'
                                        onSubmitEditing={() => yearRef.current.focus()}
                                        style={[styles.textInput, styles[`textInput${theme}`]]}
                                        blurOnSubmit={false}
                                        onBlur={handleBlur('grade')}
                                    />
                                </View>
                                {touched.grade && errors.grade && <Text style={styles.error}>{errors.grade}</Text>}
                                <Text style={[styles.label, styles[`label${theme}`]]}>שנה</Text>
                                <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                                    <TextInput
                                        value={values.year}
                                        onChangeText={handleChange('year')}
                                        keyboardType="number-pad"
                                        placeholder='שנה...'
                                        placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                        ref={yearRef}
                                        style={[styles.textInput, styles[`textInput${theme}`]]}
                                        maxLength={4}
                                        onBlur={handleBlur('year')}
                                    />
                                </View>
                                {touched.year && errors.year && <Text style={styles.error}>{errors.year}</Text>}
                                <Text style={[
                                    { marginTop: 10 },
                                    theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }
                                ]}>
                                    סמסטר
                                </Text>
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
                                    onPress={() => { handleSubmit(); setErrors({}) }}
                                    style={[styles.button, styles[`button${theme}`]]}
                                >
                                    <Text style={[styles[`text${theme}`], , { fontFamily: 'VarelaRound' }]}>עדכון</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
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

