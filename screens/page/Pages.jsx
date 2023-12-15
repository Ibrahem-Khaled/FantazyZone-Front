import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'

const Pages = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    function Geting() {
        setLoad(true)
        axios.get(`https://fantasyzon.com/api/page/get`)
            .then(res => {
                setData(res.data)
                setLoad(false)
            }).catch(err => {
                setData([])
                setLoad(false)
            })
    }

    useEffect(() => {
        Geting()
    }, [])

    const { user } = useContext(Auth)

    const nav = useNavigation()

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header name={"الصفحات"} isBack={true} />
            {user.is_admin == 0 ? null
                :
                <Button
                    onPress={() => { nav.navigate('createPage') }}
                    textColor='#fff'
                    style={{ backgroundColor: '#9bd5fe', width: "65%", borderRadius: 10, justifyContent: 'center', height: 50, margin: 5 }}
                >انشاء صفحة
                </Button>}
            <ScrollView>
                {load ? <ActivityIndicator size={'larg'} /> : data.map((item, index) => {
                    return (
                        <Text
                            onPress={() => {
                                nav.navigate('League', {
                                    id: item.id,
                                    name: item.name,
                                })
                            }}
                            style={{
                                width: 225,
                                height: 50,
                                fontSize: 18,
                                backgroundColor: '#82cafe',
                                color: '#fff',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                margin: 5,
                                fontWeight: 'bold',
                                borderRadius: 10
                            }} key={index}>{item.name}</Text>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Pages

const styles = StyleSheet.create({})