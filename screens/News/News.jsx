import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../Components/Header'
import axios from 'axios'
import { Auth } from '../AuthContext/Auth'


const News = () => {

    const [data, setDate] = useState([]);
    const [load, setLoad] = useState(false);

    const New = () => {
        setLoad(true)
        axios.get('https://fantasyzon.com/api/get/posts').then(res => {
            setLoad(false)
            setDate(res.data)
        })
    }

    useEffect(() => {
        New()
    }, [])

    function Time(item) {
        let time = new Date(item)
        return (
            time.toUTCString()
        )
    }

    const nullImage = 'data:image/png;base64,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'
    const nav = useNavigation()
    const { user } = useContext(Auth)

    return (
        <View style={{ flex: 1 }}>
            <Header isBack={true} name={'الاخبار'} />
            {user.is_admin == 0 ? null
                :
                <TouchableOpacity onPress={() => { nav.navigate('createnews') }} style={{
                    width: "50%",
                    height: 50,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    backgroundColor: '#9be5fe',
                    borderRadius: 10,
                    margin: 5
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17, color: '#fff' }}>انشاء منشور</Text>
                </TouchableOpacity>
            }

            <ScrollView>
                {load == true ?
                    <ActivityIndicator size={'large'} color={'red'}></ActivityIndicator>
                    :
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                nav.navigate('newscontent', {
                                    id: item.id,
                                    image: item.image,
                                    title: item.title,
                                    description: item.description,
                                    date: item.created_at
                                })
                            }} key={index} style={styles.main}>
                                <Image source={{ uri: item.image !== null ? `https://fantasyzon.com/image/${item.image}` : nullImage }} style={styles.img} />
                                <View style={{ flexDirection: "row", width: "90%", alignSelf: "center", justifyContent: "space-around", alignItems: "center" }}>
                                    <Text style={[styles.txt, { width: "40%" }]}>{item.title}</Text>
                                    <Text style={[styles.txt, { fontSize: 13, fontWeight: "400" }]}>{Time(item.created_at)}</Text>
                                </View>
                                <Text style={styles.description}>{item.description}</Text>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>
    )
}

export default News

const styles = StyleSheet.create({
    main: {
        width: "99%",
        alignItems: "center",
        alignSelf: "center",
        margin: 8,
    },
    txt: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'gray'
    },
    description: {
        fontWeight: "700",
        fontSize: 14,
        color: 'gray',
        maxHeight: "21%",
        marginTop: 10
    },
    img: {
        width: "95%",
        height: 200,
        alignSelf: "center",
        borderRadius: 10
    },
})