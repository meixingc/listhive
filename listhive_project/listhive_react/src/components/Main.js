import { Routes, Route } from "react-router-dom"
import About from "./main/basic/About"
import Home from "./main/basic/Home"
import HomeList from "./main/lists/HomeList"
import HomeTracker from "./main/trackers/HomeTracker"
import Login from "./main/users/Login"
import Register from "./main/users/Register"
import Explore from "./main/basic/Explore"
import Lists from "./main/lists/Lists"
import ExploreList from "./main/lists/ExploreList"
import Trackers from "./main/trackers/Trackers"
import ExploreTracker from "./main/trackers/ExploreTracker"
import Creators from "./main/creators/Creators"
import Search from "./main/basic/Search"
import Profile from "./main/users/Profile"
import Create from "./main/create/Create"
import CreateList from "./main/create/CreateList"
import UpdateList from "./main/create/UpdateList"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'

export default function Main() {
    const location = useLocation()
    return (
        <div className='Main'>
            <AnimatePresence >
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Home />} />
                    <Route path='/home/list/:id' element={<HomeList />} />
                    <Route path='/home/tracker/:id' element={<HomeTracker />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/explore' element={<Explore />} />
                    <Route path='/explore/search/results' element={<Search />} />
                    <Route path='/explore/lists' element={<Lists />} />
                    <Route path='/explore/lists/:id' element={<ExploreList />} />
                    <Route path='/explore/trackers' element={<Trackers />} />
                    <Route path='/explore/trackers/:id' element={<ExploreTracker />} />
                    <Route path='/explore/creators' element={<Creators />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/create/listitem' element={<CreateList />} />
                    <Route path='/update/list/:id' element={<UpdateList />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}