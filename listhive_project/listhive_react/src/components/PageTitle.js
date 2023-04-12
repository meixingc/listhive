import '../styles/PageTitle.css'
import { useLocation } from 'react-router-dom'

export default function PageTitle() {
    const { pathname } = useLocation()
    if ( pathname === '/' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> WELCOME! </h1>
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