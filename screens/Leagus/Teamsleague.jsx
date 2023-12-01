import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const TeamsLeague = ({ route }) => {
    const { id, name } = route.params

    const { user } = useContext(Auth)
    const nav = useNavigation()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const Fechleague = () => {
        setloading(true)
        axios.get(`https://fantasyzon.com/api/get/league/team/${id}`)
            .then(res => {
                setData(res.data.team)
                setloading(false)
            }).catch(err => {
                alert('هناك خطأ')
            })
    }

    useEffect(() => {
        Fechleague()
    }, [])


    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={`فرق الدوري ${name}`} />
            <View style={styles.main}>
                {user.team_leader == 0 ? null
                    :
                    <TouchableOpacity onPress={() => {
                        nav.navigate('createTeam', {
                            id: id
                        })
                    }} style={styles.btn}>
                        <Text style={styles.txt}>انشاء فريق لهذا الدوري</Text>
                    </TouchableOpacity>
                }
                {user.leagues_leader == 0 ? null
                    :
                    <TouchableOpacity onPress={() => {
                        nav.navigate('setUserTeamLeader')
                    }} style={styles.btn}>
                        <Text style={styles.txt}>من يمكنه انشاء فريق</Text>
                    </TouchableOpacity>
                }
            </View>
            {loading ? <ActivityIndicator />
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('getUserforTeam', {
                                id: item.id,
                                name: item.name,
                            })
                        }} style={styles.league}>
                            <Image style={{ width: 70, height: 70 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2257/2257060.png' }} />
                            <View style={{ height: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
                                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>فريق - {item.name}</Text>
                                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>النقاط - {item.points}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            }
        </View>
    )
}

export default TeamsLeague


const styles = StyleSheet.create({
    main: {
        width: "100%",
        alignItems: "center",
        margin: 8,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: 'wrap'
    },
    txt: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
        textAlign: "center",
    },
    btn: {
        width: "48%",
        height: 50,
        backgroundColor: "#8cffa4",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        margin: 2
    },
    league: {
        width: 330,
        height: 175,
        backgroundColor: "#a48cff",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "space-around",
        margin: 5,
        flexDirection: "row",
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 20,
    },
})