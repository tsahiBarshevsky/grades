import React, { useState, useContext } from 'react';
import { TouchableOpacity, SafeAreaView, Text, View, TextInput, Keyboard, ScrollView } from 'react-native';
import { Equation, parse } from 'algebra.js';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from '../../utils/ThemeManager';
import { styles } from './styles';

const ImproveScreen = () => {

    const [newGPA, setNewGPA] = useState('');
    const [results, setResults] = useState([]);
    const courses = useSelector(state => state.courses);
    // const coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));
    const { theme } = useContext(ThemeContext);

    const sortByWeight = (a, b) => {
        return (a.items.weight < b.items.weight) ? 1 : ((b.items.weight < a.items.weight) ? -1 : 0);
    }

    const searchRelevantCourses = (newGPA) => {
        var weights = 0;
        var result = [];
        var fragments = new Map();
        courses.forEach((course) => course.grade ? weights += course.weight : null);
        courses.forEach((course, key) => course.grade ? fragments.set(key, `(${course.grade} * ${course.weight}) / ${weights}`) : null);
        let fragmentsGroup = [];
        courses.forEach((course, index1) => {
            fragments.forEach((fragment, index2) => {
                if (index1 !== index2)
                    fragmentsGroup.push(fragment)
            });
            var numbers = fragmentsGroup.join(' + ')
            var expression1 = parse(numbers.concat(" + ", `${course.weight} * x / ${weights}`));
            var expression2 = parse(String(newGPA));
            var equation = new Equation(expression1, expression2);
            const answer = Math.ceil(equation.solveFor("x"));
            console.log(`answer for ${course.name}:`, answer)
            if (answer >= 0 && answer <= 100)
                result.push({ name: course.name, newGrade: answer });
            fragmentsGroup = [];
        });
        setResults(result);
    }

    var averageSchema = Yup.object().shape({
        average: Yup.number()
            .moreThan(0, 'ערך זה צריך להיות מספר חיובי')
            .lessThan(101, 'ערך זה צריך להיות קטן מ-100')
            .required('זהו שדה חובה')
            .typeError('ערך זה צריך להיות מספר'),
    });

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <Text style={[styles.mainTitle, styles[`mainTitle${theme}`]]}>
                בדיקת שיפור ממוצע
            </Text>
            <Formik
                initialValues={{ average: '' }}
                validationSchema={averageSchema}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    Keyboard.dismiss();
                    setNewGPA(values.average);
                    searchRelevantCourses(values.average);
                    resetForm();
                }}
            >
                {({ handleChange, handleSubmit, values, errors, setErrors, touched }) => (
                    <View style={{ marginTop: 10, marginBottom: 15 }}>
                        <View style={styles.form}>
                            <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                                <TextInput
                                    value={values.average}
                                    onChangeText={handleChange('average')}
                                    placeholder="ממוצע רצוי..."
                                    keyboardType="number-pad"
                                    placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                    selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                                    style={[styles.textInput, styles[`textInput${theme}`]]}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => { handleSubmit(); setErrors({}) }}
                                style={[styles.button, styles[`button${theme}`]]}
                            >
                                <Text style={[styles[`text${theme}`], { fontFamily: 'VarelaRound' }]}>בדיקה</Text>
                            </TouchableOpacity>
                        </View>
                        {touched.average && errors.average && <Text style={styles.error}>{errors.average}</Text>}
                    </View>
                )}
            </Formik>
            <View style={styles.results}>
                {results.length > 0 ?
                    <View>
                        <Text style={[styles.text, styles[`text${theme}`]]}>
                            עבור ממוצע {newGPA}, ניתן לשפר את אחד מהקורסים הבאים בציונים:
                        </Text>
                        <ScrollView style={{ marginTop: 10 }}>
                            {results.map((result, index) => {
                                return (
                                    <View key={index} style={[styles.course, styles[`course${theme}`]]}>
                                        <Text style={[styles.text, styles[`text${theme}`]]}>
                                            {result.name}
                                        </Text>
                                        <Text style={[styles.text, styles[`text${theme}`]]}>
                                            {result.newGrade}
                                        </Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    :
                    <Text style={[styles.text, styles[`text${theme}`]]}>נראה שאינך יכול/ה להגיע לממוצע {newGPA}</Text>
                }
            </View>
        </SafeAreaView>
    )
}

export default ImproveScreen;

