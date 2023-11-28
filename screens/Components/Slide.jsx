import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

export default function Slide() {

    const images = [
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1663133768501-1ff9ba64d122?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb3RiYWxsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb3RiYWxsfGVufDB8fDB8fHww",
    ]

    return (
        <SliderBox
            images={images}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
            sliderBoxHeight={200}
            dotColor="#8caeff"
            inactiveDotColor="#90A4AE"
            autoplay={true}
            disableOnPress
            circleLoop
            autoplayInterval={2000}
            ImageComponentStyle={{borderRadius: 15, width: '97%', margin:5}}
            activeOpacity={0.5}
        />
    )
}

const styles = StyleSheet.create({

})