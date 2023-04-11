import './App.css'
import React, { useState } from 'react'
import { UserContext } from './context/UserContext'
import { PageContext } from './context/PageContext'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

export default function App() {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ page, setPage ] = useState('home')

    return (
        <div className="App">
            <PageContext.Provider value={{ page, setPage }}>
                <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
                    <Nav />
                    <Main />
                </UserContext.Provider>
            </PageContext.Provider>
            <Footer />
        </div>
    )
}