import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getCourses, setCourses, replacer } from '../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../utils/ThemeManager';
import { addNewCourse } from '../../actions';
import { styles } from './styles';
import { darkTheme, lightTheme } from '../../utils/Themes';


const InsertionScreen = ({ navigation }) => {

    const [semester, setSemester] = useState("א'");
    const [formKey, setFormKey] = useState(0);
    const weightRef = useRef(null);
    const gradeRef = useRef(null);
    const yearRef = useRef(null);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const schema = Yup.object().shape({
        name: Yup.string().required('זהו שדה חובה'),
        weight: Yup.number()
            .moreThan(0, 'ערך זה צריך להיות מספר חיובי')
            .required('זהו שדה חובה')
            .typeError('ערך זה צריך להיות מספר'),
        grade: Yup.number()
            .moreThan(-1, 'הציון צריך להיות גדול מאפס')
            .lessThan(101, 'הציון לא יכול להיות גדול מ-100')
            .typeError('ערך זה צריך להיות מספר'),
        year: Yup.string()
            .min(4, 'שנה צריכה להכיל 4 ספרות')
            .max(4, 'שנה צריכה להכיל 4 ספרות')
            .required('זהו שדה חובה')
            .typeError('ערך זה צריך להיות מספר')
    });

    const onAddNewCourse = (newCourse) => {
        newCourse.weight = Number(newCourse.weight);
        newCourse.grade = newCourse.grade ? Number(newCourse.grade) : null;
        newCourse.semester = semester;
        getCourses().then((storage) => {
            var jsonMap = '';
            const id = uuid.v4();
            if (storage.size === 0) {
                const map = new Map().set(id, newCourse);
                var jsonMap = JSON.stringify(map, replacer);
                setCourses(jsonMap); // update AsyncStorage
                dispatch(addNewCourse(id, newCourse)); // update store
            }
            else {
                storage.set(id, newCourse);
                jsonMap = JSON.stringify(storage, replacer);
                setCourses(jsonMap); // update AsyncStorage
                dispatch(addNewCourse(id, newCourse)); // update store
            }
            setFormKey(Math.random());
            navigation.navigate('StackNavigator');
        });
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
                                {errors.name && <Text style={styles.error}>{errors.name}</Text>}
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
                                {errors.weight && <Text style={styles.error}>{errors.weight}</Text>}
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
                                {errors.grade && <Text style={styles.error}>{errors.grade}</Text>}
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
                                {errors.year && <Text style={styles.error}>{errors.year}</Text>}
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
                                    key={formKey}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => { handleSubmit(); setErrors({}) }}
                                    style={[styles.button, styles[`button${theme}`]]}
                                >
                                    <Text style={styles[`text${theme}`]}>הוספה</Text>
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

export default InsertionScreen;