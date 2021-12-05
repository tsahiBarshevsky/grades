import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import { setIsFirstUse as updateFirstUse } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

const WalkthroughScreen = ({ setIsFirstUse }) => {

    const onStartApp = () => {
        setIsFirstUse(false);
        updateFirstUse();
    }

    return (
        <>
            <StatusBar style='light' />
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                loop={false}
                dotColor='#ffffff80'
                activeDotColor='#ffffff'
            >
                <View style={[styles.slide, styles.slide1]}>
                    <View style={[styles.half, styles.top]}>
                        <Image
                            source={require('../../../assets/1.png')}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.half, styles.bottom]}>
                        <Text style={[styles.text, styles.title]}>ברוכים הבאים לציונים!</Text>
                        <Text style={[styles.text, styles.caption]}>
                            האפליקציה שתעשה לך סדר בקורסים ובציונים של התואר.
                        </Text>
                    </View>
                </View>
                <View style={[styles.slide, styles.slide2]}>
                    <View style={[styles.half, styles.top]}>
                        <Image
                            source={require('../../../assets/2.png')}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.half, styles.bottom]}>
                        <Text style={[styles.text, styles.title]}>כל הדרך עד התעודה</Text>
                        <Text style={[styles.text, styles.caption]}>
                            תמיד רצית מסמך מסודר עם כל הקורסים שעברת ולא עברת? חישבת בעצמך ממוצע שנתי וכללי? אפליקציית ציונים תעשה זאת עבורך בקלות.
                        </Text>
                    </View>
                </View>
                <View style={[styles.slide, styles.slide3]}>

                    <View style={[styles.half, styles.top]}>
                        <Image
                            source={require('../../../assets/3.png')}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.half, styles.bottom]}>
                        <Text style={[styles.text, styles.title]}>הכנסה מהירה</Text>
                        <Text style={[styles.text, styles.caption]}>
                            אין צורך להסתבך עם קובץ אקסל, פשוט מכניסים קורס והאפליקציה כבר תמיין לפי שנים וסמסטרים ותחשב ממוצע כללי ושנתי.
                        </Text>
                    </View>
                </View>
                <View style={[styles.slide, styles.slide4]}>
                    <View style={[styles.half, styles.top]}>
                        <Image
                            source={require('../../../assets/4.png')}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    </View>
                    <View style={[styles.half, styles.bottom]}>
                        <Text style={[styles.text, styles.title]}>עריכה ומחיקה בקלות</Text>
                        <Text style={[styles.text, styles.caption]}>
                            שיפרתם ציון? רוצים למחוק קורס שפרשתם ממנו? אפשר לערוך בקלות על ידי החלקת קורס ימינה, ולמחוק על ידי החלקה ימינה.
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.button}
                            onPress={() => onStartApp()}
                        >
                            <Text style={[styles.text, styles.buttonText]}>אני רוצה להתחיל!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        </>
    )
}

export default WalkthroughScreen;


