import { Routes, Route } from "react-router-dom"
import About from "./main/basic/About"
import Home from "./main/basic/Home"
import HomeList from "./main/lists/HomeList"
import HomeTracker from "./main/trackers/HomeTracker"
import Login from "./main/users/Login"
import Register from "./main/users/Register"
import Explore from "./main/basic/Explore"
import Lists from "./main/lists/Lists"
import Trackers from "./main/trackers/Trackers"
import Creators from "./main/creators/Creators"
import Search from "./main/basic/Search"
import Profile from "./main/users/Profile"
import Create from "./main/create/Create"


export default function Main() {
    return (
        <div className='Main'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home/list/:id' element={<HomeList />} />
                <Route path='/home/tracker/:id' element={<HomeTracker />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/explore/search/results' element={<Search />} />
                <Route path='/explore/lists' element={<Lists />} />
                <Route path='/explore/trackers' element={<Trackers />} />
                <Route path='/explore/creators' element={<Creators />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/create' element={<Create />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    )
}