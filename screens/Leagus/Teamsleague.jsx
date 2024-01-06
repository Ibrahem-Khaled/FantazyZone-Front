import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const TeamsLeague = ({ route }) => {
    const { id, name, leagueUser } = route.params
    let sort = 0
    const { user } = useContext(Auth)
    const nav = useNavigation()

    const [data, setData] = useState([])
    const [league, setLeague] = useState([])
    const [loading, setloading] = useState(false)
    const [admin, setAdmin] = useState(false)

    const Fechleague = () => {
        setloading(true)
        axios.get(`https://fantasyzon.com/api/get/league/team/${id}`)
            .then(res => {
                const data = res.data.league.team
                const admins = res.data.league.team_admin
                console.log(admins)
                const isAdmin = admins.some(obj => obj.id == user.id);
                console.log(isAdmin)
                setAdmin(isAdmin)
                
                setLeague(res.data)
                const sortedData = [...data].sort((a, b) => b.points - a.points);
                setData(sortedData);
                setloading(false)
            }).catch(err => {
                alert('هناك خطأ')
            })
    }

    useEffect(() => {
        Fechleague()
    }, [])
    const tableHead = ['الترتيب', 'اسم الفريق', 'النقاط', 'اجمالي النقاط']

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} name={`فرق الدوري ${name}`} />
            <View style={styles.main}>
                {admin == false ? null
                    :
                    <TouchableOpacity onPress={() => {
                        nav.navigate('createTeam', {
                            id: id
                        })
                    }} style={styles.btn}>
                        <Text style={styles.txt}>انشاء فريق لهذا الدوري</Text>
                    </TouchableOpacity>
                }
                {user.id !== leagueUser ? null
                    :
                    <TouchableOpacity onPress={() => {
                        nav.navigate('setUserTeamLeader', {
                            leagueId: id,
                        })
                    }} style={styles.btn}>
                        <Text style={styles.txt}>من يمكنه انشاء فريق</Text>
                    </TouchableOpacity>
                }
            </View>
            <TouchableOpacity
                onPress={() => {
                    nav.navigate('match', {
                        id: id,
                        name: name
                    })
                }}
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 6,
                    alignSelf: "center",
                    alignItems: 'center',
                    justifyContent: "center",
                    backgroundColor: '#fe8995',
                    margin: 4
                }}>
                <Text style={styles.txt}>مواجهات - Vs - الفرق</Text>
            </TouchableOpacity>
            <View style={{
                width: '99%',
                borderWidth: 1.5,
                alignSelf: 'center',
                borderRadius: 3,
                borderColor: '#c8e1ff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {tableHead.map((item, index) => {
                    return (
                        <Text style={{ fontWeight: 'bold', margin: 6, maxWidth: '23%', textAlign: 'center' }}>{item}</Text>
                    )
                })}
            </View>
            {loading ? <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size={'large'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('getUserforTeam', {
                                id: item.id,
                                name: item.name,
                                capten: league.is_capten,
                                deka: league.is_spare,
                            })
                        }} style={styles.league}>
                            <Text style={styles.dataText}>{++sort}</Text>
                            <Text style={styles.dataText}>{item.name}</Text>
                            <Text style={styles.dataText}>{item.current_points}</Text>
                            <Text style={styles.dataText}>{item.points}</Text>
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
        flexWrap: 'wrap',
        alignSelf: 'center'
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
        width: '98%',
        alignSelf: 'center',
        backgroundColor: "#a48cff",
        alignItems: "center",
        borderRadius: 5,
        justifyContent: "space-around",
        margin: 5,
        flexDirection: "row",
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 20,
    },
    dataText: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18,
        textAlign: 'center',
        maxWidth: '30%',
        marginTop: 3,
        marginBottom: 3,
        margin: 3
    },
})