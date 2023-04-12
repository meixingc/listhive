import './App.css'
import React, { useState } from 'react'
import { UserContext } from './context/UserContext'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

export default function App() {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [user, setUser] = useState(null)

    return (
        <div className="App">
                <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
                    <Nav />
                    <Main />
                </UserContext.Provider>
            <Footer />
        </div>
    )
}