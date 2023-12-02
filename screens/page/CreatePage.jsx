import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { Button, TextInput } from 'react-native-paper'

const CreatePage = () => {

    const [name, setName] = useState()
    const Create = () => {
        axios.post(`https://fantasyzon.com/api/page/post`, {
            name: name,
        }).then(res => {
            alert('Done')
        }).catch(err => {
            alert('ERROR')
        })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header name={'انشاء صفحة'} isBack={true} />
            <TextInput
                mode='outlined'
                placeholder='اسم الصفحة'
                label={'اسم الصفحة'}
                onChangeText={text => setName(text)}
                style={{ width: '80%', margin: 5 }}
            />
            <Button
                onPress={() => { Create() }}
                mode='contained'
                style={{ width: "55%", justifyContent: 'center', height: 60, borderRadius: 8, margin: 5 }}>
                انشاء صفحة
            </Button>
        </View>
    )
}

export default CreatePage

const styles = StyleSheet.create({})