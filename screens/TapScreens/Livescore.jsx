import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header';


const width = Dimensions.get('window').width;


const ScoreItem = ({ score, index }) => {
    return (
        <View style={styles.scoreItem}>
            <Text style={styles.scoreText}>
                {index + 1}. {score.name} - {score.score}
            </Text>
        </View>
    );
};


const scores = [
    {
        name: 'barcha',
        score: 25,
    },
    {
        name: 'real M',
        score: 18,
    },
    {
        name: 'alahly',
        score: 1,
    },
    {
        name: 'Zamalek',
        score: 119,
    },
    {
        name: 'AFC',
        score: 50,
    },
    {
        name: 'SDA',
        score: 30,
    },
]

const Livescore = () => {
    // const [scores, setScores] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const getScores = async () => {
    //         // Fetch scores data from your source here
    //         const response = await fetch('your-source-url');
    //         const data = await response.json();
    //         setScores(data);
    //         setLoading(false);
    //     };

    //     getScores();
    // }, []);

    // if (loading) {
    //     return (
    //         <View style={styles.loader}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <Header isBack={true} name={'نتائج المباريات'} />
            <FlatList
                data={scores}
                renderItem={({ item, index }) => (
                    <ScoreItem score={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    scoreItem: {
        backgroundColor: '#FFF',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: width * 0.9,
    },
    scoreText: {
        fontSize: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Livescore;
