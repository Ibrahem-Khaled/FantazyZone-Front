import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import Header from '../Components/Header'
import axios from 'axios'

export default function Createnews() {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    function Create() {
        axios.post('https://fantasyzon.com/api/post/posts', {
            title: title,
            description: desc
        })
            .then(function (response) {
                alert('Done!')
                setTitle('')
                setDesc('')
            })
            .catch(function (error) {
                alert(error)
            });
    }

    return (
        <View style={styles.main}>
            <Header isBack={true} name={'انشاء منشور جديد'} />
            <TextInput
                style={{ width: "80%" }}
                mode="outlined"
                label="عنوان المنشور"
                placeholder="عنوان المنشور"
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                style={{ width: "80%" }}
                mode="outlined"
                label="وصف المنشور"
                placeholder="وصف المنشور"
                multiline
                onChangeText={text => setDesc(text)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => { Create() }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>انشاء</Text>
            </TouchableOpacity>
        </View>
    )
}

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
})