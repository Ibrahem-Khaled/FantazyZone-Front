import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
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
                setData(res.data.users)
                setTeam(res.data)
                console.log(res.data)
                setLoad(false)
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
                        <View style={styles.main}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.name}>{item.points}</Text>
                        </View>
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
        backgroundColor: "#ff6b7a",
        margin: 3,
        borderRadius: 8,
        justifyContent: 'space-around'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff06b'
    },
})