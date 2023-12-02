import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../Components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Auth } from '../AuthContext/Auth'
import Slide from '../Components/Slide'


const Buttons = [
    {
        name: 'الاخبار',
        navigation: 'news',
        icon: 'ios-newspaper',
        color: '#fff',
    },
    {
        name: 'نتائج المباريات',
        navigation: 'livescore',
        icon: 'football-sharp',
        color: '#fff',
    },
    {
        name: 'انشاء دوريات الكاس',
        navigation: 'pages',
        icon: 'game-controller',
        color: '#fff',
    },
    {
        name: 'التواصل لتنظيم الدوريات والشكاوي',
        navigation: 'complaintsSuggests',
        icon: 'information-circle',
        color: '#fff',
    },
]


export default function Home() {
    const { user } = useContext(Auth)
    const nav = useNavigation()
    console.log(user.name)
    return (
        <View style={{ flex: 1 }}>
            <Header name={'الرئيسية'} Fname={user.name} />

            <Slide />
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}>
                {Buttons.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => { nav.navigate(item.navigation) }} key={index}
                            style={styles.btn}>
                            <Text style={styles.txt}>{item.name}</Text>
                            <Ionicons name={item.icon} size={44} color={item.color} />
                        </TouchableOpacity>
                    )
                })}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: "45%",
        alignSelf: "center",
        backgroundColor: "#de8cff",
        borderRadius: 8,
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 5,
        height: 160,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 20,
    },
    txt: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
        textAlign: "center"
    },
})