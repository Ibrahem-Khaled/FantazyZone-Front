import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { Button } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'

const GetuserForteam = ({ route }) => {
    const { name, id } = route.params

    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])
    const [team, setTeam] = useState([])

    useEffect(() => {
        setLoad(true)
        axios.get(`https://fantasyzon.com/api/get/teams/${id}`)
            .then(res => {
                let users = res.data.users
                setData(users)
                setTeam(res.data)
                const sum = users.reduce((acc, item) => acc + item.points, 0);
                setLoad(false)
                axios.post(`https://fantasyzon.com/api/update/teams/${id}`, {
                    points: sum
                }).then(res => {
                    console.log('done')
                }).catch(err => {
                    console.error(err)
                })
            })
            .catch(err => {
                alert('هناك خطا')
                alert(err)
                setLoad(false)
            })
    }, [])

    const { user } = useContext(Auth)
    const nav = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} name={`فريق ${name}`} />
            {user.team_leader !== team.id ? null
                :
                <Button
                    onPress={() => {
                        nav.navigate('showTeam', {
                            id: team.id
                        })
                    }}
                    mode='contained' style={{ width: '80%', height: 50, justifyContent: "center", borderRadius: 8, alignSelf: 'center', margin: 5 }}>
                    اضافة لعيبة الي الفريق
                </Button>}
            {load ? <ActivityIndicator size={'large'} color={'red'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => { alert('captin') }}
                            onLongPress={() => { alert('deka') }}
                            style={[styles.main, { backgroundColor: item.captin == 0 ? '#ff6b7a' : '#fffbce' }]}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.name}>{item.points}</Text>
                            {item.captin !== 1 ? null : <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4978/4978025.png' }} />}
                        </TouchableOpacity>
                    }
                />
            }
        </View >
    )
}

export default GetuserForteam

const styles = StyleSheet.create({
    main: {
        width: '95%',
        alignSelf: "center",
        alignItems: 'center',
        flexDirection: "row",
        height: 55,
        margin: 3,
        borderRadius: 8,
        justifyContent: 'space-around'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000'
    },
})