import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../../services/Auth'

export default function Register() {
    const navigate = useNavigate()

    const [ formValues, setFormValues ] = useState({
        photo: '',
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await RegisterUser({
            photo: formValues.photo,
            name: formValues.name,
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
        })
        setFormValues({
            photo: '',
            name: '',
            username: '',
            email: '',
            password: '',
        })
        navigate('/login')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Upload Photo:
                <input type="text" name="photo" value={formValues.photo} onChange={handleChange} />
            </label>
            <label>
                Full Name:
                <input type="text" name="name" value={formValues.name} onChange={handleChange} />
            </label>
            <label>
                Username:
                <input type="text" name="username" value={formValues.username} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formValues.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formValues.password} onChange={handleChange} />
            </label>
            <button type="submit">Register</button>
        </form>
    )
}