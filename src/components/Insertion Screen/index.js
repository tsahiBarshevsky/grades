import React, { useState, useContext, useRef } from 'react';
import { View, Button, TouchableOpacity, Text, SafeAreaView, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { getCourses, setCourses, replacer } from '../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../utils/ThemeManager';
import { addNewCourse } from '../../actions';
import { styles } from './styles';
import { darkTheme, lightTheme } from '../../utils/Themes';

import { Formik } from 'formik';
import * as Yup from 'yup';

const InsertionScreen = ({ navigation }) => {

    // const [name, setName] = useState('');
    // const [weight, setWeight] = useState(null);
    // const [grade, setGrade] = useState(null);
    const [semester, setSemester] = useState("א'");
    // const [year, setYear] = useState('');
    const weightRef = useRef(null);
    const gradeRef = useRef(null);
    const yearRef = useRef(null);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const schema = Yup.object().shape({
        name: Yup.string().required('זהו שדה חובה'),
        weight: Yup.number().moreThan(-1, 'קטן מדי').required('זהו שדה חובה').typeError('זה לא מספר'),
        grade: Yup.number().moreThan(-1, 'קטן מדי').lessThan(101, 'גדול מדי').typeError('זה לא מספר'),
        year: Yup.string().min(4, 'חייב להכיל 4 ספרות').max(4, 'חייב להכיל 4 ספרות').required('זהו שדה חובהf').typeError('זה לא מספר')
    });

    // const clearForm = () => {
    //     setName('');
    //     setWeight(null);
    //     setGrade(null);
    //     setSemester("א'");
    //     setYear('');
    // }

    const onAddNewCourse = (newCourse) => {
        newCourse.weight = Number(newCourse.weight);
        newCourse.grade = newCourse.grade ? Number(newCourse.grade) : null;
        newCourse.semester = semester;
        console.log(newCourse)
        // getCourses().then((storage) => {
        //     var jsonMap = '';
        //     const id = uuid.v4();
        //     if (storage.size === 0) {
        //         const map = new Map().set(id, newCourse);
        //         var jsonMap = JSON.stringify(map, replacer);
        //         setCourses(jsonMap); // update AsyncStorage
        //         dispatch(addNewCourse(id, newCourse)); // update store
        //     }
        //     else {
        //         storage.set(id, newCourse);
        //         jsonMap = JSON.stringify(storage, replacer);
        //         setCourses(jsonMap); // update AsyncStorage
        //         dispatch(addNewCourse(id, newCourse)); // update store
        //     }
        //     navigation.navigate('StackNavigator');
        // });
    }

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <Text style={[styles.mainTitle, styles[`mainTitle${theme}`]]}>
                הוספת קורס חדש
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <Formik
                        initialValues={{ name: '', weight: '', grade: '', year: '' }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            onAddNewCourse(values);
                            resetForm();
                        }}
                        validationSchema={schema}
                    // validate={(values) => {
                    //     let errors = {};
                    //     if (!values.name)
                    //         errors.name = 'זהו שדה חובה';
                    //     /* weight errors */
                    //     if (!values.weight)
                    //         errors.weight = 'זהו שדה חובה';
                    //     else
                    //         if (Number(values.weight) <= 0)
                    //             errors.weight = 'נק"ז צריך להיות מספר חיובי'
                    //     /* grade errors */
                    //     if (!/^\d+$/.test(values.grade) && values.grade !== '')
                    //         errors.grade = 'הציון צריך להכיל מספרים בלבד'
                    //     else
                    //         if (Number(values.grade) < 0 || Number(values.grade) > 100)
                    //             errors.grade = 'הציון צריך להיות ערך בין 0 ל-100'
                    //     /* year errors */
                    //     if (!values.year)
                    //         errors.year = 'זהו שדה חובה';
                    //     else
                    //         if (!/^\d{4}$/.test(values.year))
                    //             errors.year = 'השנה צריכה להכיל 4 ספרות';
                    //     return errors;
                    // }}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, setErrors, touched }) => (
                            <View>
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
                                        error={errors.name}
                                        touched={touched.name}
                                    />
                                </View>
                                {errors.name && <Text>{errors.name}</Text>}
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
                                        error={errors.weight}
                                        touched={touched.weight}
                                    />
                                </View>
                                {errors.weight && <Text>{errors.weight}</Text>}
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
                                {errors.grade && <Text>{errors.grade}</Text>}
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
                                {errors.year && <Text>{errors.year}</Text>}
                                <Text style={[
                                    { marginTop: 10 },
                                    theme === 'light' ? { color: '#9e9e9e' } : { color: '#ffffff80' }
                                ]}>
                                    סמסטר
                                </Text>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
                                    onPress={(value) => setSemester(value)}
                                    buttonColor={theme === 'light' ? lightTheme.title : darkTheme.title}
                                    buttonSize={12}
                                    selectedButtonColor={theme === 'light' ? lightTheme.title : darkTheme.title}
                                    selectedLabelColor={theme === 'light' ? lightTheme.text : darkTheme.text}
                                    labelColor={theme === 'light' ? lightTheme.text : darkTheme.text}
                                    labelStyle={{ marginLeft: 10, fontSize: 16 }}
                                    style={styles.radioForm}
                                />
                                <Button onPress={() => { handleSubmit(); setErrors({}) }} title="Submit" />
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
            {/* <Text style={[styles.mainTitle, styles[`mainTitle${theme}`]]}>
                הוספת קורס חדש
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
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
                        initial={0}
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
                        onPress={() => onAddNewCourse()}
                        style={[styles.button, styles[`button${theme}`]]}
                    >
                        <Text style={styles[`text${theme}`]}>הוספה</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView> */}
        </SafeAreaView>
    )
}

var radio_props = [
    { label: "א'", value: "א'" },
    { label: "ב'", value: "ב'" },
    { label: "ג'", value: "ג'" },
];

export default InsertionScreen;