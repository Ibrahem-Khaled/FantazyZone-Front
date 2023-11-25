import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../Components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Auth } from '../AuthContext/Auth'


const Buttons = [
    {
        name: 'الاخبار',
        navigation: 'news',
        icon: 'ios-newspaper',
        color: 'gray',
    },
    {
        name: 'نتائج المباريات',
        navigation: 'livescore',
        icon: 'football-sharp',
        color: 'gray',
    },
    {
        name: 'انشاء دوريات الكاس',
        navigation: 'League',
        icon: 'game-controller',
        color: 'gray',
    },
    {
        name: 'التواصل لتنظيم الدوريات والشكاوي',
        navigation: 'complaintsSuggests',
        icon: 'information-circle',
        color: 'gray',
    },
]


export default function Home() {
    const { user } = useContext(Auth)
    const nav = useNavigation()
    console.log(user.name)
    return (
        <View style={{ flex: 1 }}>

            <Header name={'الرئيسية'} Fname={user.name} />

            {Buttons.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => { nav.navigate(item.navigation) }} key={index} style={{
                        width: "95%",
                        alignSelf: "center",
                        backgroundColor: "#faa578",
                        flexDirection: "row",
                        borderRadius: 8,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        margin: 5,
                        height: 90
                    }}>
                        <Text style={styles.txt}>{item.name}</Text>
                        <Ionicons name={item.icon} size={35} color={item.color} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'gray'
    },
})