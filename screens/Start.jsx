import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import { Auth } from './AuthContext/Auth';
import Spinner from 'react-native-loading-spinner-overlay';

const Start = () => {

    const [text, setText] = React.useState(null);
    const { Create, isloading, } = useContext(Auth)


    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={isloading} />
            <ImageBackground resizeMode='cover' style={styles.bgimage} source={require('../image/background.jpg')}>
                <Text style={styles.txt}>اهلا بك</Text>
                <Image style={{ width: 200, height: 200, borderRadius: 10, resizeMode: 'contain' }} source={require('../assets/icon.png')} />
                <TextInput
                    style={{ width: "80%" }}
                    mode="outlined"
                    label="ID FNPL"
                    placeholder="ID FNPL"
                    keyboardType='number-pad'
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <TouchableOpacity style={styles.btn} onPress={() => { text !== null ? Create(text) : alert('من فضلك لا يمكن تركه فارغ') }}>
                    <Text style={{ fontSize: 17, color: '#fff', fontFamily: 'Reem',fontWeight:'bold' }}>التالي</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default Start

const styles = StyleSheet.create({
    bgimage: {
        alignItems: "center",
        flex: 1,
        justifyContent: "space-evenly"
    },
    txt: {
        fontWeight: "bold",
        color: "#de8cff",
        fontSize: 20,
        fontFamily:'Reem'
    },
    btn: {
        width: "60%",
        height: 60,
        justifyContent: "center",
        backgroundColor: "#a48cff",
        alignItems: "center",
        borderRadius: 10
    },
})