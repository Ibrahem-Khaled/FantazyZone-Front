import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Button } from 'react-native-paper'

const Index = () => {

    const { user } = useContext(Auth)
    const nav = useNavigation()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const Fechleague = () => {
        setloading(true)
        axios.get('https://fantasyzon.com/api/get/league')
            .then(res => {
                setData(res.data)
                setloading(false)
            })
    }

    useEffect(() => {
        Fechleague()
    }, [])


    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={'الدوريات والكأس'} />
            <View style={styles.main}>
                {user.leagues_leader == 0 ? null
                    :
                    <TouchableOpacity onPress={() => { nav.navigate('createLeague') }} style={styles.btn}>
                        <Text style={styles.txt}>انشاء دوري</Text>
                    </TouchableOpacity>
                }
                {user.is_admin == 0 ? null
                    :
                    <TouchableOpacity onPress={() => { nav.navigate('setUserLeague') }} style={styles.btn}>
                        <Text style={styles.txt}>من يمكنه انشاء دوري</Text>
                    </TouchableOpacity>
                }
            </View>
            <Button
                mode='contained'
                onPress={() => { nav.navigate('match') }}
                style={{ width: "70%", height: 50, backgroundColor: 'red', borderRadius: 8, justifyContent: "center" }}>
                مواجهات الفرق
            </Button>
            {!user.leagues_leader == 1 ? null :
                <Button
                    mode='contained'
                    onPress={() => {
                        nav.navigate('showLeague', {
                            id: user.id
                        })
                    }}
                    style={{ width: "70%", height: 50, backgroundColor: 'red', borderRadius: 8, justifyContent: "center", margin: 5 }}>
                    تعديل الدوريات الخاصة بك
                </Button>}
            {loading ? <ActivityIndicator size={"large"} color={'red'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('leagueTeam', {
                                id: item.id,
                                name: item.name,
                            })
                        }} style={styles.league}>
                            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>دوري - {item.name}</Text>
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
        width: "45%",
        height: 50,
        backgroundColor: "green",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center"
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