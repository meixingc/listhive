import '../styles/Main.css'
import { Routes, Route } from "react-router-dom"
import About from "./main/basic/About"
import Home from "./main/basic/Home"
import Login from "./main/users/Login"
import Register from "./main/users/Register"
import Explore from "./main/basic/Explore"
import Profile from "./main/users/Profile"
import Create from "./main/create/CreateList"

export default function Main() {
    return (
        <div className='Main'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/create' element={<Create />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    )
}