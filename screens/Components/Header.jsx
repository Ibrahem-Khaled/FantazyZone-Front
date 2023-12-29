import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Auth } from '../AuthContext/Auth'



export default function Header({ name, isBack, Fname }) {

    let nav = useNavigation()
    const { Logout } = useContext(Auth)
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Configure the animation
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 30, // Destination value
                duration: 5000, // Animation duration in milliseconds
                useNativeDriver: false, // You must set useNativeDriver: false for Text component
            })
        ).start(); // Start the animation
    }, [translateX]);
    return (
        <View style={styles.main}>
            {isBack && <Ionicons onPress={() => { nav.goBack() }} name="arrow-back-circle-outline" size={30} color="#fff" />}
            {Fname && <Text style={[styles.txt, { width: "40%" }]}>{Fname}</Text>}
            <Animated.Text style={{
                transform: [{ translateX }],
                fontFamily: 'Reem',
                fontSize: 18,
                color: "#fff",
            }}>{name}</Animated.Text>
            <Entypo onPress={() => [Logout()]} name="log-out" size={24} color="#fff" />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: 55,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#8caeff",
        justifyContent: "space-around",
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 20,
    },
    txt: {
        fontFamily: 'Reem',
        fontSize: 18,
        color: "#fff",
    },
})