import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import Header from '../Components/Header'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';

export default function Createnews() {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        try {
            let uploadData = new FormData();
            uploadData.append('photo', {
                type: 'image/jpeg',
                uri: photo,
                name: 'upload.jpg'
            })
            uploadData.append("name", name);
            const response = await fetch(`https://www.egyptonlineapp.com/api/v1/create-categories`, {
                method: 'POST',
                body: uploadData
            }).then((res) => {
                setName('')
                setPhoto('')
                setLoading('success')
                console.log(uploadData)
            })
        } catch (err) {
            console.log(err);
            alert('لا يمكن تكرار نفس الاسم')
            setLoading('error')
        }
    };

    async function Create() {
        try {
            let uploadData = new FormData();
            uploadData.append('image', {
                type: 'image/jpeg',
                uri: image,
                name: 'upload.jpg'
            })

            uploadData.append("title", title);
            uploadData.append("description", desc);

            const response = await fetch(`https://fantasyzon.com/api/post/posts`, {
                method: 'POST',
                body: uploadData
            }).then((res) => {
                alert('Done!')
                console.log(uploadData)
            })
        } catch (err) {
            alert(err)
        }

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

            <TouchableOpacity style={styles.btn} onPress={() => { pickImage() }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>اختر الصورة من فضلك</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={{ width: '90%', height: 200, borderRadius: 10 }} />}

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