import { Routes, Route } from "react-router-dom"
import About from "./main/basic/About"
import Home from "./main/basic/Home"
import Login from "./main/users/Login"
import Register from "./main/users/Register"
import Explore from "./main/basic/Explore"
import Lists from "./main/lists/Lists"
import Search from "./main/basic/Search"
import Profile from "./main/users/Profile"
import Create from "./main/create/Create"

export default function Main() {
    return (
        <div className='Main'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/explore/search/results' element={<Search />} />
                <Route path='/explore/lists' element={<Lists />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/create' element={<Create />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    )
}