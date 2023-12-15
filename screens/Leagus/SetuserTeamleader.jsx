import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { Button } from 'react-native-paper'


const SetUserTeamLeader = () => {

    function Update(userid) {
        axios.post(`https://fantasyzon.com/api/update/user/${userid}`, {
            team_leader: 1,
        }).then(res => {
            alert('done!')
        }).catch(err => {
            alert(err)
        })
    }

    const [fnid, setFnid] = useState(0)
    const [load, setLoad] = useState(false)

    function Get() {
        setLoad(true)
        axios.get(`https://fantasyzon.com/api/where/${fnid}`)
            .then(res => {
                let data = res.data[0]
                if (Object.keys(data).length == 0) {
                    return alert('هذا الرقم غير مسجل من قبل')
                }
                setFnid(data)
                console.log(data)
                setLoad(false)
            }).catch(err => {
                alert('هذا الرقم غير مسجل')
                setLoad(false)
            })
    }

    return (
        <View>
            <Header isBack={true} name={'من يمكنه انشاء فريق'} />
            <TextInput
                placeholder='ادخل اي دي الاعب المراد'
                keyboardType='number-pad'
                onChangeText={text => setFnid(text)}
                style={styles.inbt}
            />
            {load ? <ActivityIndicator color={'red'} size={'large'} />
                :
                <TouchableOpacity onPress={() => { Update(fnid.id) }} style={[styles.user, { backgroundColor: fnid.team_leader == 1 ? 'green' : 'gray' }]}>
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>{fnid.name}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>{fnid.team_leader == 1 ? 'هذا قائد فريق بالفعل' : 'ليس قائد فريق'}</Text>
                </TouchableOpacity>
            }
            <Button
                onPress={() => { Get() }}
                mode='contained' style={{ width: '50%', margin: 5, alignSelf: 'center', borderRadius: 5 }}>
                بحث
            </Button>
        </View>
    )
}

export default SetUserTeamLeader

const styles = StyleSheet.create({
    inbt: {
        width: '95%',
        height: 55,
        backgroundColor: '#fff',
        marginTop: 5,
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    user: {
        width: '80%',
        height: 60,
        margin: 5,
        alignSelf: 'center',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center"
    },
})