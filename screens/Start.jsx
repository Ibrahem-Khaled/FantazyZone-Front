import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
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
                <Text style={styles.txt}>Welcome in FantazyZone</Text>
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
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>NEXT</Text>
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
        color: "#000",
        fontSize: 20
    },
    btn: {
        width: "60%",
        height: 60,
        justifyContent: "center",
        backgroundColor: "red",
        alignItems: "center",
        borderRadius: 10
    },
})