import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import axios from 'axios'
import Cookies from 'js-cookie';
const csrftoken = Cookies.get('csrftoken');

export default function Login() {
    const { setLoggedIn } = useContext(UserContext)

    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(csrftoken)
        axios.post('http://localhost:8000/accounts/login/', form, {
            headers: {
                'X-CSRFToken': csrftoken
            }}).then(() => setLoggedIn(true)).catch((error) => {
                console.log(error);
              })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={form.username} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={form.password} onChange={handleChange} />
                </label>
                <button type="submit">Login</button>
            </form>
            <Link to="/register"> No Account? </Link>
        </div>
        
    )
}