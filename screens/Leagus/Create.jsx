import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { Checkbox, TextInput } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'

const Create = () => {
    const [name, setName] = useState('')
    const [player, setPlayer] = useState(0)
    const [team, setTeam] = useState(0)
    const { user } = useContext(Auth)
    const [checked, setChecked] = useState(false);
    const [spare, setSpare] = useState(false);


    function Create() {
        axios.post('https://fantasyzon.com/api/post/league', {
            name: name,
            max_team_number: team,
            max_player_number: player,
            user_id: user.id,
            is_capten: checked,
            is_spare: spare
        })
            .then(function (response) {
                alert('Done!')
                setName('')
                setPlayer(0)
                setTeam(0)
            })
            .catch(function (error) {
                alert(error)
            });
    }

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={'انشاء دوري'} />
            <TextInput
                style={{ width: "80%" }}
                mode="outlined"
                label="اسم الدوري"
                placeholder="اسم الدوري"
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={{ width: "80%" }}
                mode="outlined"
                label="اقصي عدد للفرق"
                placeholder="اقصي عدد للفرق"
                keyboardType='number-pad'
                onChangeText={text => setTeam(text)}
            />
            <TextInput
                style={{ width: "80%" }}
                mode="outlined"
                label="اقصي عدد للعيبة في الفريق"
                placeholder="اقصي عدد للعيبة في الفريق"
                keyboardType='number-pad'
                onChangeText={text => setPlayer(text)}
            />
            <View style={styles.box}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', }}> كابتن</Text>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
            </View>
            <View style={styles.box}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', }}> دكة</Text>
                <Checkbox
                    status={spare ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSpare(!spare);
                    }}
                />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => { Create() }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>انشاء</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Create

const styles = StyleSheet.create({
    main: {
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between"
    },
    txt: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 20
    },
    btn: {
        width: "60%",
        height: 60,
        justifyContent: "center",
        backgroundColor: "red",
        alignItems: "center",
        borderRadius: 10,
        margin: 5
    },
    box: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 5,
        alignSelf: "center"
    }
})
