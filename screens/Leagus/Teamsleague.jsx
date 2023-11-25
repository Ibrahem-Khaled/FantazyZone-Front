import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Button } from 'react-native-paper'

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
            }).catch(err=>{
                alert('هناك خطأ')
            })
    }

    useEffect(() => {
        Fechleague()
    }, [])


    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={`فرق الدوري ${name}`} />
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
                            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>فريق - {item.name}</Text>
                            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>النقاط - {item.points}</Text>
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
        width: "99%",
        alignItems: "center",
        alignSelf: "center",
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
        width: "55%",
        height: 50,
        backgroundColor: "green",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        margin: 5
    },
    league: {
        width: 330,
        height: 50,
        backgroundColor: "gray",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        margin: 5
    },
})