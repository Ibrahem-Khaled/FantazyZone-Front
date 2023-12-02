import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const Auth = createContext()


const any = {
    "captin": 0,
    "fn_id": 0,
    "id": null,
    "is_admin": 0,
    "leagues_leader": 0,
    "name": "loading ....",
    "points": null,
    "team_id": 0,
    "team_leader": 0,
}

export const AuthProvider = ({ children }) => {
    const [done, setDone] = useState(false)

    const [user, setUser] = useState(any)
    const [userinfo, setUserinfo] = useState({})
    const [isloading, setloading] = useState(false)

    function Create(fn_id) {
        setloading(true)
        axios.post('https://fantasyzon.com/api/post/user', {
            fn_id: fn_id,
        })
            .then(response => {
                let data = response.data.data
                setUserinfo(data)
                AsyncStorage.setItem('users', JSON.stringify(data))
                setloading(false)
            })
            .catch(e => {
                console.log(e);
                alert('هذا الرقم مسجل لدينا من قبل')
                setloading(false)
            });
    }

    async function Logout() {
        axios.post(`https://fantasyzon.com/api/delete/user/${userinfo.id}`,)
            .then(res => {
                AsyncStorage.removeItem('users')
                setloading(false)
                alert('success')
                setUserinfo({})

            })
            .catch(err => {
                alert(err)
                setloading(false)
            });
    }

    const Loged = async () => {
        let data = await AsyncStorage.getItem('users')
        let josndata = JSON.parse(data)
        if (Object.keys(josndata).length !== 0) {
            setUserinfo(josndata)
        }
    }


    async function User() {
        let data = await AsyncStorage.getItem('users')
        let josndata = JSON.parse(data)
        await axios.get(`https://fantasyzon.com/api/user/${josndata.id}`)
            .then(response => {
                let data = response.data
                setUser(data)
            }).catch(err => {
                setDone(true)
            })
    }

    useEffect(() => {
        Loged()
        User()
    }, [done])

    return (
        <Auth.Provider
            value={{
                Create, userinfo, isloading, Logout, user,
            }}>
            {children}
        </Auth.Provider>
    )

}