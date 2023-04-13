import './App.css'
import React, { useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { CheckSession } from './services/Auth'
import Client from './services/api'
import { BASE_URL } from './services/api'

import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'


export default function App() {
    const [ loggedIn, setLoggedIn ] = useState(localStorage.getItem("loggedIn") == "true")
    const [ user, setUser ] = useState(null)
    // const [ users, setUsers ] = useState([])
    // const [ followers, setFollowers ] = useState([])
    // const [ favorites, setFavorites ] = useState([])
    // const [ likes, setLikes ] = useState([])
    // const [ lists, setLists ] = useState([])
    // const [ listItems, setListItems ] = useState([])
    // const [ trackers, setTrackers ] = useState([])
    // const [ trackerFields, setTrackerFields ] = useState([])
    // const [ trackerItems, setTrackerItems ] = useState([])
    // const [ trackerItemValues, setTrackerItemValues ] = useState([])
    // const [ folders, setFolders ] = useState([])
    // const [ listsInFolders, setListsInFolders ] = useState([])
    // const [ trackersInFolders, setTrackersInFolders ] = useState([])

    const handleLogOut = () => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
        setUser(null)
    }

    useEffect(() => {
        const getSession = async () => {
            const session = await CheckSession()
            setUser(session)
            setLoggedIn(session !== null)
        }
        getSession()
    }, [])

    // Get Initial Data
    useEffect(() => {
        // const getUsers = async () => {
        //     const response = await Client.get(`${BASE_URL}/users`)
        //     setUsers(response.data)
        //     console.log(response.data)
        // }
        const getLists = async () => {
            const response = await Client.get(`${BASE_URL}/lists`)
            setLists(response.data)
        }
        const getTrackers = async () => {
            const response = await Client.get(`${BASE_URL}/trackers`)
            setTrackers(response.data)
        }
        // getUsers()
        getLists()
        getTrackers()
    }, [])

    return (
        <div className="App">
                <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, handleLogOut }}>
                    <Nav />
                    <Main />
                </UserContext.Provider>
            <Footer />
        </div>
    )
}