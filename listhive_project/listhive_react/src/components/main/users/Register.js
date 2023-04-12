import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [form, setForm] = useState({
        photo: '',
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/api/users', form)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Upload Photo:
                <input type="text" name="photo" value={form.photo} onChange={handleChange} />
            </label>
            <label>
                Full Name:
                <input type="text" name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
                Username:
                <input type="text" name="username" value={form.username} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={form.password} onChange={handleChange} />
            </label>
            <label>
                Confirm Password:
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            </label>
            <button type="submit">Register</button>
        </form>
    )
}