import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../Components/Header'
import { Button } from 'react-native-paper'
import { Auth } from '../AuthContext/Auth'
import axios from 'axios'

const Match = () => {
    const { user } = useContext(Auth)
    function Random() {
        axios.get('https://fantasyzon.com/api/match/random').
            then(res => {
                alert('done!')
            }).catch(err=>{
                alert('Field')
            })
    }

    return (
        <View>
            <Header isBack={true} name={'مواجهات الفرق'} />
            {!user.is_admin == 1 ? null :
                <Button onPress={() => { Random() }} mode='contained' style={{
                    width: '80%',
                    height: 50,
                    justifyContent: "center",
                    borderRadius: 8,
                    alignSelf: 'center',
                    margin: 5
                }}>
                    أضغط هنا لعمل توزيع عشوائي للفرق
                </Button>}
        </View>
    )
}

export default Match

const styles = StyleSheet.create({})