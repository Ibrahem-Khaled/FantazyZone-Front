import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './TapScreens/Home';

const Tab = createBottomTabNavigator();

export default function Taps() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'ADS') {
                        iconName = focused ? 'headset' : 'headset-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#a48cff',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen options={{ tabBarLabel: 'الرئيسية', tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 } }} name="Home" component={Home} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})