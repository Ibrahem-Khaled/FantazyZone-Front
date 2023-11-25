import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { TextInput } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'

const CreateTeams = ({ route }) => {
    const { id } = route.params
    const [name, setName] = useState('')
    const { user } = useContext(Auth)

    function Create() {
        axios.post(`https://fantasyzon.com/api/post/teams/${id}`, {
            name: name,
            user_id: user.id
        })
            .then(function (response) {
                alert(response.data)
                setName('')
            })
            .catch(function (error) {
                alert(error)
            });
    }

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={'انشاء فريق'} />
            <TextInput
                style={{ width: "80%" }}
                mode="outlined"
                label="اسم الفريق"
                placeholder="اسم الفريق"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => { Create() }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>انشاء</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateTeams

const styles = StyleSheet.create({
    btn: {
        width: "60%",
        height: 60,
        justifyContent: "center",
        backgroundColor: "red",
        alignItems: "center",
        borderRadius: 10,
        margin: 5
    },
})