import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Button } from 'react-native-paper'

const Index = ({ route }) => {

    const { name, id } = route.params

    const { user } = useContext(Auth)
    const nav = useNavigation()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const Fechleague = () => {
        setloading(true)
        axios.get(`https://fantasyzon.com/api/get/league/${id}`)
            .then(res => {
                setData(res.data.league)
                setloading(false)
            })
    }
    useEffect(() => {
        Fechleague()
    }, [])


    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={`صفحة ${name}`} />
            <View style={styles.main}>
                {user.leagues_leader == 0 ? null
                    :
                    <TouchableOpacity onPress={() => {
                        nav.navigate('createLeague', {
                            pageid: id
                        })
                    }} style={styles.btn}>
                        <Text style={styles.txt}>انشاء دوري او كاس</Text>
                    </TouchableOpacity>
                }
                {user.is_admin == 0 ? null
                    :
                    <TouchableOpacity onPress={() => { nav.navigate('setUserLeague') }} style={styles.btn}>
                        <Text style={styles.txt}>من يمكنه انشاء دوري</Text>
                    </TouchableOpacity>
                }
                {!user.leagues_leader == 1 ? null :
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            nav.navigate('showLeague', {
                                id: user.id
                            })
                        }}>
                        <Text style={styles.txt}> تعديل الدوريات الخاصة بك</Text>

                    </TouchableOpacity>}
            </View>

            {loading ? <ActivityIndicator size={"large"} color={'red'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('leagueTeam', {
                                id: item.id,
                                name: item.name,
                            })
                        }} style={styles.league}>
                            <Image style={{ width: 70, height: 70 }} source={{ uri: item.status !== 'league' ? 'https://cdn-icons-png.flaticon.com/128/7960/7960328.png' : 'https://cdn-icons-png.flaticon.com/128/12567/12567031.png' }} />
                            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>{item.status == 'league' ? 'دوري' : 'كاس'} - {item.name}</Text>
                        </TouchableOpacity>
                    }
                />
            }


        </View>
    )
}

export default Index


const styles = StyleSheet.create({
    main: {
        width: "100%",
        alignItems: "center",
        flexWrap: "wrap",
        margin: 8,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    txt: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
        textAlign: "center",
    },
    btn: {
        width: "47%",
        height: 50,
        backgroundColor: "#b5dffe",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 20,
    },
    league: {
        width: 150,
        height: 170,
        backgroundColor: "#8caeff",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "space-around",
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 20,
    },
})