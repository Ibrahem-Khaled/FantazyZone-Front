import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../Components/Header'
import { FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ShowLeague = ({ route }) => {
    const { id } = route.params
    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])

    function GetLeague() {
        setLoad(true)
        axios.get(`https://fantasyzon.com/api/user/league/${id}`).
            then(res => {
                setData(res.data.league)
                setLoad(false)
            }).catch(err => {
                setLoad(false)
                alert(err)
            })
    }
    useEffect(() => {
        GetLeague()
    }, [])
    const nav = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} name={'تعديل الدوريات الخاصة بك'} />
            {load ? <ActivityIndicator size={'large'} color={'red'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('editLeague', {
                                id: item.id,
                                names: item.name,
                            })
                        }} style={styles.btn}>
                            <Text style={styles.txt}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                />}
        </View>
    )
}

export default ShowLeague

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        alignSelf: 'center',
        alignItems: "center",
        backgroundColor: 'gray',
        margin: 5,
        height: 55,
        justifyContent: 'center',
        borderRadius: 5
    },
    txt: {
        fontFamily: 'Reem',
        color: '#fff',
        fontSize: 18
    },
})