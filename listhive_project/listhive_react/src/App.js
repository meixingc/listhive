import './App.css'
import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <div className="App">
            <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
                <Nav />
                <Main />
            </UserContext.Provider>
            <Footer />
        </div>
    )
}