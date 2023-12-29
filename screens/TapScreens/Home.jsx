import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState ,useEffect} from 'react'
import Header from '../Components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Auth } from '../AuthContext/Auth'
import Slide from '../Components/Slide'
import axios from 'axios';

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
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fantasyzon.com/api/get/posts');
                // Assuming the response data is an array
                const lastFiveData = response.data.slice(-5);
                setData(lastFiveData);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Header name={'الرئيسية'} Fname={user.name} />
            <Slide data={data} />
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