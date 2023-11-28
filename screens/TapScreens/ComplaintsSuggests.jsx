import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { Ionicons } from '@expo/vector-icons'
const ComplaintsSuggests = () => {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Header isBack={true} name={'الشكاوي والمقترحات'} />
            <View style={{ flex: 1, justifyContent: "space-around",alignItems:"center",width:"80%",alignSelf:"center" }}>
                <Text style={styles.txt}>
                    للاشتراك في الدورى او الكأس
                    والشكاوى والمقترحات . اضغط هنا
                </Text>
                <TouchableOpacity onPress={() => { Linking.openURL('https://www.facebook.com/profile.php?id=61553719622178&mibextid=2JQ9oc') }}>
                    <Ionicons style={{ margin: 10 }} name="ios-logo-facebook" size={100} color="#4383fa" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ComplaintsSuggests

const styles = StyleSheet.create({
    txt: {
        fontWeight: "bold",
        fontSize: 16,
        width: "95%",
        textAlign: "center",
    },
})