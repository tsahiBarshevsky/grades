import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { getCourses, setCourses, replacer } from '../../utils/AsyncStorageHandler';
import { addNewCourse } from '../../actions';
import { styles } from './styles';

const InsertionScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [weight, setWeight] = useState(null);
    const [grade, setGrade] = useState(null);
    const [semester, setSemester] = useState('א');
    const [year, setYear] = useState('');
    const dispatch = useDispatch();

    const clearForm = () => {
        setName('');
        setWeight(null);
        setGrade(null);
        setSemester('א');
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
            navigation.navigate('StackNavigator');
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>הוספת קורס</Text>
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
            <TextInput
                value={year ? year.toString() : ''}
                onChangeText={setYear}
                placeholder='שנה'
                keyboardType="number-pad"
            />
            <Picker
                selectedValue={semester}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSemester(itemValue)}
            >
                <Picker.Item label="א" value="א" />
                <Picker.Item label="ב" value="ב" />
                <Picker.Item label="קיץ" value="קיץ" />
            </Picker>
            {/* <Picker
                selectedValue={year}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
            >
                <Picker.Item label="א" value="א" />
                <Picker.Item label="ב" value="ב" />
                <Picker.Item label="ג" value="ג" />
                <Picker.Item label="ד" value="ד" />
            </Picker> */}
            <TouchableOpacity onPress={() => onAddNewCourse()}>
                <Text>הוסף</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearForm()}>
                <Text>ניקוי</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default InsertionScreen;