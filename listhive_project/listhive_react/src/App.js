import './App.css'
import React from 'react'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="App">
        <Nav />
        <Main />
        <Footer />
    </div>
  );
}