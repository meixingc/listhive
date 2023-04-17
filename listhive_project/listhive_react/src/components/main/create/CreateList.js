import '../../../styles/Create.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../services/api'
import { UserContext } from '../../../context/UserContext'
import { DataContext } from '../../../context/DataContext'
import { useContext } from 'react'

export default function CreateList() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { listCreating } = useContext(DataContext)
    
    const [ listFormValues, setListFormValues ] = useState({
        value: '',
    })

    const listHandleChange = (event) => {
        setListFormValues({...listFormValues, [event.target.name]: event.target.value})
    }


    const listHandleSubmit = async(e) => {
        e.preventDefault();
        navigate('/')
        const data = {
            list: listCreating,
            value: listFormValues.value,
        }
        try {
            const response = await axios.post(`${BASE_URL}/listitems/create`, data);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        setListFormValues({
            name: '',
            description: '',
            public: '',
        })
    }

    return (
        <div className='CreateList'>
            <form onSubmit={listHandleSubmit} className='createform'>
                <div className='createinput'>
                    <label className='createlabel'>Add Item:</label>
                    <input type="text" name="value" value={listFormValues.value} onChange={listHandleChange} />
                </div>
                <button type='submit'> Create </button>
            </form>
        </div>
    )
}