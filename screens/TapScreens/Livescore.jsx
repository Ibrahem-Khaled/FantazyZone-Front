import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    FlatList
} from 'react-native';
import Header from '../Components/Header';
import axios from "axios";
import { Button } from 'react-native-paper'

const Livescore = ({ score, index }) => {
    const [scores, setScores] = useState([]);
    const [loading, setloading] = useState(false);

    const Data = () => {
        setloading(true)
        axios.get(`https://apiv3.apifootball.com/?action=get_events&APIkey=430259d3909224aeee90235bb15af8124d92b80f9e838dc3e7af4024e9bc4276&match_live=1`)
            .then(res => {
                setScores(res.data)
                setloading(false)
            }).catch(err => {
                alert(err)
                setloading(false)
            })
    }
    useEffect(() => {
        Data()
    }, [])



    return (
        <View style={styles.container}>
            <Header isBack={true} name={'نتائج المباريات'} />

            <FlatList
                data={scores}
                contentContainerStyle={{alignItems:"center",justifyContent:"center"}}
                renderItem={({ item, index }) => (
                    <View style={{
                        width: '90%',
                        backgroundColor: '#b8a6ff',
                        borderRadius: 5,
                        marginTop: 12,
                        shadowColor: '#000',
                        shadowOffset: { width: -4, height: 6 },
                        shadowOpacity: 1,
                        shadowRadius: 1,
                        elevation: 20,
                    }}>
                        <View style={styles.subview}>
                            <Text style={{ fontWeight: "bold", color: '#fff', }}>Match Date</Text>
                            <Text style={{ fontWeight: "400", backgroundColor: "red", color: "#fff", padding: 3, margin: 5, borderRadius: 8 }}>{item.match_date} - {item.match_time}</Text>
                        </View>
                        <View style={styles.subview}>
                            <Image style={styles.logoteam} source={{ uri: item.team_home_badge }} />
                            <Text style={styles.score}>{item.match_hometeam_score}</Text>
                            <Text style={styles.score}>:</Text>
                            <Text style={styles.score}>{item.match_awayteam_score}</Text>
                            <Image style={styles.logoteam} source={{ uri: item.team_away_badge }} />
                        </View>
                        <View style={styles.subview}>
                            <Text style={styles.name}>{item.match_hometeam_name}</Text>
                            <Text style={styles.name}>{item.match_awayteam_name}</Text>
                        </View>
                        <Button mode='contained' style={{ width: "90%", borderRadius: 8, alignSelf: "center", margin: 5 }}>
                            قريبا سيتوفر مشاهدة المباريات
                        </Button>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    subview: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    logoteam: {
        width: 80,
        height: 80,
        margin: 5,
        resizeMode:"contain"
    },
    score: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 23
    },
    name: {
        fontWeight: "700",
        color: "#fff",
        fontSize: 17,
        margin: 7
    },
});

export default Livescore;
