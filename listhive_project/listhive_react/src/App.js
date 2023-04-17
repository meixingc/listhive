import './App.css'
import React, { useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { DataContext } from './context/DataContext'
import { CheckSession } from './services/Auth'
import Client from './services/api'
import { BASE_URL } from './services/api'

import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'
import PageTitle from './components/PageTitle'

export default function App() {
    const [ loggedIn, setLoggedIn ] = useState(localStorage.getItem("loggedIn") == "true")
    const [ user, setUser ] = useState(null)
    const [ searchResultsLists, setSearchResultsLists ] = useState([])
    const [ searchResultsTrackers, setSearchResultsTrackers ] = useState([])
    const [ searchResultsUsers, setSearchResultsUsers ] = useState([])
    const [ selectedList, setSelectedList ] = useState('')
    const [ selectedTracker, setSelectedTracker ] = useState('')
    const [ selectedCreator, setSelectedCreator ] = useState('')

    // API Data States
    // Users
    const [ users, setUsers ] = useState([])
    // const [ followers, setFollowers ] = useState([])
    // const [ favorites, setFavorites ] = useState([])
    // const [ likes, setLikes ] = useState([])

    // Lists
    const [ lists, setLists ] = useState([])
    const [ listItems, setListItems ] = useState([])
    // Trackers

    const [ trackers, setTrackers ] = useState([])
    const [ trackerFields, setTrackerFields ] = useState([])
    const [ trackerItems, setTrackerItems ] = useState([])
    const [ trackerItemValues, setTrackerItemValues ] = useState([])

    // Folders
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
            const sessionUser = await CheckSession()
            setUser(sessionUser)
            setLoggedIn(sessionUser !== null)
        }
        getSession()
    }, [])

    // Get Initial Data
    // Users
    useEffect(() => {
        const getUsers = async () => {
            const response = await Client.get(`${BASE_URL}/users`)
            setUsers(response.data)
            console.log('users', response.data)
        }
        getUsers()
    }, [])
    // Lists
    useEffect(() => {
        const getLists = async () => {
            const response = await Client.get(`${BASE_URL}/lists`)
            setLists(response.data)
            console.log('lists', response.data)
        }
        const getListItems = async () => {
            const response = await Client.get(`${BASE_URL}/listitems`)
            setListItems(response.data)
            console.log('list items', response.data)
        }
        getLists()
        getListItems()
    }, [])
    // Trackers
    useEffect(() => {
        const getTrackers = async () => {
            const response = await Client.get(`${BASE_URL}/trackers`)
            setTrackers(response.data)
            console.log('trackers', response.data)
        }
        const getTrackerFields = async () => {
            const response = await Client.get(`${BASE_URL}/tracker/fields`)
            setTrackerFields(response.data)
            console.log('tracker fields', response.data)
        }
        const getTrackerItems = async () => {
            const response = await Client.get(`${BASE_URL}/tracker/items`)
            setTrackerItems(response.data)
            console.log('tracker items', response.data)
        }
        const getTrackerItemValues = async () => {
            const response = await Client.get(`${BASE_URL}/tracker/item/values`)
            setTrackerItemValues(response.data)
            console.log('tracker item values', response.data)
        }
        getTrackers()
        getTrackerFields()
        getTrackerItems()
        getTrackerItemValues()
    }, [])

    return (
        <div className="App">
                <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, handleLogOut }}>
                    <Nav />
                    <PageTitle />
                    <DataContext.Provider value={{ users, lists, listItems, trackers, trackerFields, trackerItems, trackerItemValues, searchResultsLists, setSearchResultsLists, searchResultsTrackers, setSearchResultsTrackers, searchResultsUsers, setSearchResultsUsers, selectedCreator, setSelectedCreator, selectedList, setSelectedList, selectedTracker, setSelectedTracker }}>
                        <Main />
                    </DataContext.Provider>
                </UserContext.Provider>
            <Footer />
        </div>
    )
}