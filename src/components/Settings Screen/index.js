import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SwitchToggle from "react-native-switch-toggle";
import AwesomeAlert from 'react-native-awesome-alerts';
import { ThemeContext } from '../../utils/ThemeManager';
import { setFailure as updateFailure, clearAllCourses } from '../../utils/AsyncStorageHandler';
import { darkTheme, lightTheme } from '../../utils/Themes';
import { clearData } from '../../actions';
import { styles } from './styles';

const SettingsScreen = () => {

    const [failure, setFailure] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [failureAlert, setFailureAlert] = useState(false);
    const score = useSelector(state => state.score);
    const { toggleTheme } = React.useContext(ThemeContext);
    const { theme } = React.useContext(ThemeContext);
    const dispatch = useDispatch();

    const containerStyle = {
        width: 60,
        height: 32,
        borderRadius: 25,
        padding: 5
    };

    const circleStyle = {
        width: 25,
        height: 25,
        borderRadius: 12.5
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: 2 }]
    };

    const buttonStyle = {
        position: 'absolute',
        transform: (theme === 'light' ? [{ translateX: -3 }] : [{ translateX: -30 }])
    }

    const onUpdateScore = () => {
        if (failure > 0 && failure <= 100) {
            updateFailure(failure);
            dispatch({ type: 'SET_SCORE', score: failure });
            setFailure('');
        }
        else
            setFailureAlert(true);
    }

    const onClearData = () => {
        clearAllCourses();
        dispatch(clearData());
        setShowAlert(false);
    }

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.mainTitle, styles[`mainTitle${theme}`]]}>
                    העדפות אישיות
                </Text>
                <Text style={[styles.title, styles[`title${theme}`]]}>
                    נראות האפליקציה
                </Text>
                <View style={styles.toggle}>
                    <Text style={styles[`text${theme}`]}>ערכת נושא:</Text>
                    <SwitchToggle
                        RTL
                        switchOn={theme === 'light' ? false : true}
                        onPress={toggleTheme}
                        backTextRight={theme === 'light' && <Text>🌞</Text>}
                        backTextLeft={theme === 'dark' && <Text>🌜</Text>}
                        circleColorOff={lightTheme.title}
                        circleColorOn={darkTheme.title}
                        backgroundColorOff='#C4C4C4'
                        backgroundColorOn={darkTheme.boxes}
                        buttonStyle={buttonStyle}
                        rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
                        buttonContainerStyle={buttonContainerStyle}
                        containerStyle={containerStyle}
                        circleStyle={circleStyle}
                    />
                </View>
                <View style={[styles.divider, styles[`divider${theme}`]]} />
                <Text style={[styles.title, styles[`title${theme}`]]}>
                    הגדרת ציון עובר
                </Text>
                <Text style={[styles[`text${theme}`], { marginBottom: 5 }]}>באפשרותך להגדיר ציון עובר, בהתאם למוסד הלימודים בו את/ה לומד/ת.</Text>
                <Text style={styles[`text${theme}`]}>ערך נוכחי: {score}</Text>
                <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                    <TextInput
                        value={failure}
                        onChangeText={setFailure}
                        keyboardType="number-pad"
                        placeholder="ערך חדש בין 1 ל-100..."
                        placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                        selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                        style={[styles.textInput, styles[`textInput${theme}`]]}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onUpdateScore()}
                    style={[styles.button, styles[`button${theme}`], { marginTop: 10 }]}
                >
                    <Text style={styles[`text${theme}`]}>עדכון</Text>
                </TouchableOpacity>
                <View style={[styles.divider, styles[`divider${theme}`]]} />
                <Text style={[styles.title, styles[`title${theme}`]]}>
                    ניקוי נתונים
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowAlert(true)}
                    style={[styles.button, styles[`button${theme}`]]}
                >
                    <Text style={styles[`text${theme}`]}>למחיקת כל הקורסים</Text>
                </TouchableOpacity>
                <AwesomeAlert
                    show={failureAlert}
                    showProgress={false}
                    title="שים/י לב!"
                    message="הערך של ציון עובר צריך להיות מספר בין 0 לבין 100"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="הבנתי"
                    cancelButtonColor="grey"
                    confirmButtonColor="#DD6B55"
                    messageStyle={styles[`messageStyle${theme}`]}
                    contentContainerStyle={styles[`contentContainer${theme}`]}
                    titleStyle={[styles.titleStyle, styles[`titleStyle${theme}`]]}
                    actionContainerStyle={styles.actionContainerStyle}
                    onCancelPressed={() => setFailureAlert(false)}
                />
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="שים/י לב!"
                    message="את/ה עומד/ת למחוק את כל הנתונים שלך; פעולה זו אינה ניתנת לשחזור. האם את/ה בטו/ח?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="ביטול"
                    confirmText="כן, מחק"
                    cancelButtonColor="grey"
                    confirmButtonColor="#DD6B55"
                    messageStyle={styles[`messageStyle${theme}`]}
                    contentContainerStyle={styles[`contentContainer${theme}`]}
                    titleStyle={[styles.titleStyle, styles[`titleStyle${theme}`]]}
                    actionContainerStyle={styles.actionContainerStyle}
                    onCancelPressed={() => setShowAlert(false)}
                    onConfirmPressed={() => onClearData()}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsScreen;
