import '../styles/PageTitle.css'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function PageTitle() {
    const { loggedIn } = useContext(UserContext)

    const { pathname } = useLocation()
    if ( pathname === '/' && loggedIn == false ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> WELCOME! </h1>
            </div>
        )
    }
    if ( pathname === '/' && loggedIn == true) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> HOME </h1>
            </div>
        )
    }
    else if ( pathname === '/login' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> LOGIN </h1>
            </div>
        )
    }
    else if ( pathname === '/register' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> REGISTER </h1>
            </div>
        )
    }
    else if ( pathname === '/explore' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> EXPLORE </h1>
            </div>
        )
    }
    else if ( pathname === '/explore/search/results' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> SEARCH RESULTS </h1>
            </div>
        )
    }
    else if ( pathname === '/explore/lists' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> ALL LISTS </h1>
            </div>
        )
    }
    else if ( pathname === '/explore/trackers' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> ALL TRACKERS </h1>
            </div>
        )
    }
    else if ( pathname === '/explore/creators' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> ALL CREATORS </h1>
            </div>
        )
    }
    else if ( pathname === '/profile' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> PROFILE </h1>
            </div>
        )
    }
    else if ( pathname === '/create' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> CREATE </h1>
            </div>
        )
    }
    else if ( pathname === '/about' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> ABOUT ME </h1>
            </div>
        )
    }
}