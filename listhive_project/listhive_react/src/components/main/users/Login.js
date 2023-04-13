import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { SignInUser } from '../../../services/Auth'
import { CheckSession } from '../../../services/Auth'

export default function Login() {
    const navigate = useNavigate()

    const { setLoggedIn, setUser } = useContext(UserContext)

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    })

    const handleChange = (event) => {
        setFormValues({...formValues, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = await SignInUser(formValues, setUser)
            console.log(payload)
            setFormValues({ email: "", password: "" })
            setLoggedIn(true)
            localStorage.setItem('loggedIn', true)
            navigate("/")
            console.log("Logged In")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const sessionData = CheckSession(setUser);
        if (sessionData) {
            setUser(sessionData.user)
        }
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={formValues.username} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formValues.password} onChange={handleChange} />
                </label>
                <button type="submit">Login</button>
            </form>
            <Link to="/register"> No Account? </Link>
        </div>
        
    )
}