import '../styles/Nav.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { PageContext } from '../context/PageContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()
    const { loggedIn, setLoggedIn } = useContext(UserContext)
    const { setPage } = useContext(PageContext)

    const loginCreate = () => {
        navigate('/login')
        setPage('login')
    }
    const handleSignout = () => {
        setLoggedIn(false)
        navigate('/')
    }

    if (loggedIn == false) {
        return (
            <div className='Nav'>
                <div>
                    <img src='/assets/logo-no-background.png' className='nav-logo'/>
                </div>
                <div>
                    <button className='nav-login' onClick={() => loginCreate()}> Log In </button>
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
                    <button className='nav-create' onClick={() => navigate('/create')}> Create </button>
                    <Link to ='/' className='nav-item' back> Home </Link>
                    <Link to ='/explore' className='nav-item'> Explore </Link>
                    <Link to ='/profile' className='nav-item'> Profile </Link>
                    <Link to ='/' onClick={() => handleSignout()} className='nav-item'> Log Out </Link>
                </div>
            </div>
        )
    }

}