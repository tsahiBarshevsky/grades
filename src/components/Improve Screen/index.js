import React, { useState, useContext } from 'react';
import { Button, SafeAreaView, Text, View, TextInput } from 'react-native';
import { Equation, parse } from 'algebra.js';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../utils/ThemeManager';
import { styles } from './styles';

const ImproveScreen = () => {

    const [newGPA, setNewGPA] = useState('');
    const [results, setResults] = useState([]);
    const courses = useSelector(state => state.courses);
    const coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));
    const { theme } = useContext(ThemeContext);

    const sortByWeight = (a, b) => {
        return (a.items.weight < b.items.weight) ? 1 : ((b.items.weight < a.items.weight) ? -1 : 0);
    }

    const searchRelevantCourses = () => {
        var coursesArray = Array.from(courses, ([key, items]) => ({ key, items }));
        var weights = 0;
        var result = [];
        var fragments = new Map();
        courses.forEach((course) => weights += course.weight);
        courses.forEach((course, key) => fragments.set(key, `(${course.grade} * ${course.weight}) / ${weights}`));
        let x = [];
        courses.forEach((course, index1) => {
            fragments.forEach((fragment, index2) => {
                if (index1 !== index2)
                    x.push(fragment)
            });
            var numbers = x.join(' + ')
            var x1 = parse(numbers.concat(" + ", `${course.weight} * x / ${weights}`));
            var x2 = parse(newGPA);
            var eq = new Equation(x1, x2);
            result.push({ name: course.name, newGrade: Math.ceil(eq.solveFor("x")) });
            x = [];
        });
        setResults(result);
    }

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <TextInput
                value={newGPA}
                onChangeText={setNewGPA}
                placeholder="ממוצע רצוי"
                keyboardType="number-pad"
            // placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
            // selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
            // style={[styles.textInput, styles[`textInput${theme}`]]}
            />
            <Button title="try" onPress={() => searchRelevantCourses()} />
            {results.map((result, index) => {
                return (
                    <View key={index}>
                        <Text>{result.name} - {result.newGrade}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    )
}

export default ImproveScreen;

