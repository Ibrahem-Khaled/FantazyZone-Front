import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { Button } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal";


const GetuserForteam = ({ route }) => {
    const { name, id, capten, deka } = route.params
    const { user } = useContext(Auth)
    const nav = useNavigation()
    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])
    const [team, setTeam] = useState([])

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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
    }, [isModalVisible])

    function Captin(userId) {
        axios.get(`https://fantasyzon.com/api/user/captin/${id}/${userId}`).then(res => {
            closeModal()
        }).catch(err => {
            alert(err)
        })
    }
    function Deka(userId) {
        axios.get(`https://fantasyzon.com/api/user/deka/${id}/${userId}`).then(res => {
            closeModal()
        }).catch(err => {
            alert(err)
        })
    }


    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setModalVisible(false);
    };
    console.log(selectedItem)
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
                    mode='contained' style={styles.btn}>
                    اضافة لعيبة الي الفريق
                </Button>}
            {load ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={'large'} color={'red'} />
                :
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                user.team_leader == team.id ? null : openModal(item)
                            }}
                            style={[styles.main, { backgroundColor: item.captin == 0 ? '#ff6b7a' : '#fffbce' }]}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.name}>{item.points}</Text>
                            {item.captin !== 1 ? null : <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4978/4978025.png' }} />}
                            {item.deka !== 1 ? null : <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8431/8431528.png' }} />}
                        </TouchableOpacity>
                    }
                />
            }
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: .5, backgroundColor: '#fff', borderRadius: 4, justifyContent: "space-around" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center', }}>{selectedItem !== null ? selectedItem.name : null}</Text>
                    {capten == 1 ? <Button
                        disabled={selectedItem !== null ? (selectedItem.captin == 1 ? true : false) : null}
                        mode='contained'
                        style={[styles.btn, { backgroundColor: '#8ce7ff' }]} onPress={() => { Captin(selectedItem.id) }} >
                        كابتن
                    </Button> : null}
                    {capten == 0 && deka == 0 ? <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: "center" }}>لا يتوفر دكة ولا كابتن في هذا الدوري</Text> : null}
                    {deka == 1 ? <Button
                        disabled={selectedItem !== null ? (selectedItem.deka == 1 ? true : false) : null}
                        mode='contained'
                        style={[styles.btn, { backgroundColor: '#8ce7ff' }]} onPress={() => { Deka(selectedItem.id) }} >
                        دكة
                    </Button> : null}
                    <Button mode='contained'
                        style={styles.btn} onPress={closeModal} >
                        اغلاق
                    </Button>
                </View>
            </Modal>
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
    btn: {
        width: '80%',
        height: 50,
        justifyContent: "center",
        borderRadius: 8,
        alignSelf: 'center',
        margin: 5
    },
})