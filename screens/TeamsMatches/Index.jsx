import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Button } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'
import axios from 'axios'

const Match = ({ route }) => {

    const { id, name } = route.params
    const { user } = useContext(Auth)
    function Random() {
        axios.get(`https://fantasyzon.com/api/match/random/${id}`).
            then(res => {
                alert('done!')
            }).catch(err => {
                alert('Field')
            })
    }

    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    function Getdata() {
        setLoad(true)
        axios.get(`https://fantasyzon.com/api/team/match/${id}`).
            then(res => {
                setData(res.data)
                setLoad(false)
            }).catch(err => {
                alert('Field')
                setLoad(false)
            })
    }
    useEffect(() => {
        Getdata()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} name={name + '  مواجهات الفرق'} />
            {!user.is_admin == 1 ? null :
                <Button onPress={() => { Random() }} mode='contained' style={{
                    width: '80%',
                    height: 50,
                    justifyContent: "center",
                    borderRadius: 8,
                    alignSelf: 'center',
                    margin: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: -1, height: 2 },
                    shadowOpacity: 1,
                    elevation: 10,
                }}>
                    أضغط هنا لعمل توزيع عشوائي للفرق
                </Button>}
            {load ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={'large'} color={'red'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <View style={styles.main}>
                            <Text style={styles.text}>{item.team1.name}</Text>
                            <Text style={styles.text}>-   Vs    -</Text>
                            <Text style={styles.text}>{item.team2.name}</Text>
                        </View>
                    }
                />
            }
        </View>
    )
}

export default Match

const styles = StyleSheet.create({
    main: {
        width: '90%',
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fe8995',
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: -1, height: 2 },
        shadowOpacity: 1,
        elevation: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10,
        color: '#fff'
    },
})