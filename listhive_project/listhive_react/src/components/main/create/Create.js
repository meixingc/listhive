import '../../../styles/Create.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../../../services/api'
import { BASE_URL } from '../../../services/api'
import { UserContext } from '../../../context/UserContext'
import { useContext } from 'react'

export default function Create() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const [ listFormValues, setListFormValues ] = useState({
        name: '',
        description: '',
        public: false,
    })
    const [ trackerFormValues, setTrackerFormValues ] = useState({
        name: '',
        description: '',
        public: false,
    })

    const listHandleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setListFormValues({
          ...listFormValues,
          [name]: type === 'checkbox' ? checked : value,
        })
        console.log(listFormValues)
    }

    // Lists
    const listHandleSubmit = async(e) => {
        e.preventDefault();
        navigate('/')
        const data = {
            owner: user.id,
            name: listFormValues.name,
            description: listFormValues.description,
            public: listFormValues.public,
        }
        try {
            const response = await axios.post(`${BASE_URL}/lists/create`, data);
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

    // Trackers
    const trackerHandleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTrackerFormValues({
          ...trackerFormValues,
          [name]: type === 'checkbox' ? checked : value,
        })
        console.log(trackerFormValues)
    }

    const trackerHandleSubmit = async(e) => {
        e.preventDefault();
        navigate('/')
        const data = {
            owner: user.id,
            name: trackerFormValues.name,
            description: trackerFormValues.description,
            public: trackerFormValues.public,
        }
        try {
            const response = await axios.post(`${BASE_URL}/trackers/create`, data);
            console.log(response.data); 
        } catch (error) {
            console.error(error.response.data);
        }
        setTrackerFormValues({
            name: '',
            description: '',
            public: '',
        })
    }


    return (
        <div className='Create'>
            <div className='create-list'>
                <h1> Create List </h1>
                <form onSubmit={listHandleSubmit}>
                    <label> Name: </label>
                    <input type='text' name='name' maxLength='25' value={listFormValues.name} onChange={listHandleChange} required/>
                    <label> Description: </label>
                    <input type='text' name='description' maxLength='100' value={listFormValues.description} onChange={listHandleChange}/>
                    <label> Is Public: </label>
                    <input type='checkbox' name='public' value={listFormValues.public} onChange={listHandleChange}/>
                    <button type='submit'> Create </button>
                </form>
            </div>
            <div className='create-tracker'>
                <h1> Create Trackers </h1>
                <form onSubmit={trackerHandleSubmit}>
                    <label> Name: </label>
                    <input type='text' name='name' maxLength='25' value={trackerFormValues.name} onChange={trackerHandleChange} required/>
                    <label> Description: </label>
                    <input type='text' name='description' maxLength='100' value={trackerFormValues.description} onChange={trackerHandleChange}/>
                    <label> Is Public: </label>
                    <input type='checkbox' name='public' value={trackerFormValues.public} onChange={trackerHandleChange}/>
                    <button type='submit'> Create </button>
                </form>
            </div>
        </div>
    )
}