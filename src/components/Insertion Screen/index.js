import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, TextInput, Keyboard } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { getCourses, setCourses, replacer } from '../../utils/AsyncStorageHandler';
import { ThemeContext } from '../../utils/ThemeManager';
import { addNewCourse } from '../../actions';
import { styles } from './styles';
import { darkTheme, lightTheme } from '../../utils/Themes';

const InsertionScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [weight, setWeight] = useState(null);
    const [grade, setGrade] = useState(null);
    const [semester, setSemester] = useState("א'");
    const [year, setYear] = useState('');
    const weightRef = useRef(null);
    const gradeRef = useRef(null);
    const yearRef = useRef(null);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const clearForm = () => {
        setName('');
        setWeight(null);
        setGrade(null);
        setSemester("א'");
        setYear('');
    }

    const onAddNewCourse = () => {
        const newCourse = {
            name: name,
            weight: Number(weight),
            grade: grade ? Number(grade) : null,
            semester: semester,
            year: year
        };
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
            clearForm();
            Keyboard.dismiss();
            setTimeout(() => {
                navigation.navigate('StackNavigator');
            }, 1000);
        });
    }

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="שם הקורס..."
                    placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                    returnKeyType='next'
                    onSubmitEditing={() => weightRef.current.focus()}
                    style={[styles.textInput, styles[`textInput${theme}`]]}
                />
            </View>
            <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                <TextInput
                    value={weight ? weight.toString() : ''}
                    onChangeText={setWeight}
                    keyboardType="number-pad"
                    placeholder='נק"ז...'
                    placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                    ref={weightRef}
                    returnKeyType='next'
                    onSubmitEditing={() => gradeRef.current.focus()}
                    style={[styles.textInput, styles[`textInput${theme}`]]}
                />
            </View>
            <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                <TextInput
                    value={grade ? grade.toString() : ''}
                    onChangeText={setGrade}
                    keyboardType="number-pad"
                    placeholder='ציון... (ניתן להשאיר ריק)'
                    placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                    ref={gradeRef}
                    returnKeyType='next'
                    onSubmitEditing={() => yearRef.current.focus()}
                    style={[styles.textInput, styles[`textInput${theme}`]]}
                />
            </View>
            <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                <TextInput
                    value={year ? year.toString() : ''}
                    onChangeText={setYear}
                    keyboardType="number-pad"
                    placeholder='שנה...'
                    placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
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
        </SafeAreaView>
    )
}

var radio_props = [
    { label: "א'", value: "א'" },
    { label: "ב'", value: "ב'" },
    { label: "ג'", value: "ג'" },
];

export default InsertionScreen;