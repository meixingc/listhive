import '../styles/Nav.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()
    const { loggedIn, setLoggedIn } = useContext(UserContext)


    if (!loggedIn) {
        return (
            <div className='Nav'>
                <div>
                    <img src='/assets/logo.png' className='nav-logo'/>
                </div>
                <div className='nav-right'>
                    <Link to ='/' className='nav-item'> Home </Link>
                    <button className='nav-button' onClick={() => navigate('/login')}> Log In </button>
                </div>
            </div>
        )
    } 
    else {
        return (
            <div className='Nav'>
                <div>
                    <img src='/assets/logo-no-background.png' className='nav-logo'/>
                </div>
                <div className='nav-right'>
                    <button className='nav-button' onClick={() => navigate('/create')}> Create </button>
                    <Link to ='/' className='nav-item'> Home </Link>
                    <Link to ='/explore' className='nav-item'> Explore </Link>
                    <Link to ='/profile' className='nav-item'> Profile </Link>
                    <Link to ='/' onClick={() => setLoggedIn(false)} className='nav-item'> Log Out </Link>
                </div>
            </div>
        )
    }
}