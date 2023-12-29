import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

export default function Slide({ data }) {
    return (
        <SliderBox
            images={data.map((item, index) => {
                return `https://fantasyzon.com/image/${item.image}`
            })}
            sliderBoxHeight={200}
            dotColor="#8caeff"
            inactiveDotColor="#90A4AE"
            autoplay={true}
            disableOnPress
            circleLoop
            autoplayInterval={4000}
            ImageComponentStyle={{ borderRadius: 15, width: '97%', margin: 5 }}
            activeOpacity={0.5}
        />
    )
}