import '../../../styles/UpdateList.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../services/api'
import { UserContext } from '../../../context/UserContext'
import { DataContext } from '../../../context/DataContext'
import { useContext } from 'react'

export default function UpdateList() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { updateList } = useContext(DataContext)
    
    const [ listFormValues, setListFormValues ] = useState({
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


    const listHandleSubmit = async(e) => {
        e.preventDefault();
        const data = {
            owner: user.id,
            name: listFormValues.name,
            description: listFormValues.description,
            public: listFormValues.public,
        }
        try {
            const response = await axios.patch(`${BASE_URL}/lists/update/${updateList}`, data);
            console.log(response.data);
            navigate('/profile')
        } catch (error) {
            console.error(error.response.data);
        }
        setListFormValues({
            name: '',
            description: '',
            public: '',
        })
    }

    const deleteList = async() => {
        try {
            const response = await axios.delete(`${BASE_URL}/lists/delete/${updateList}`);
            console.log(response.data);
            navigate('/profile')
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div>
            <div className='PageTitle'>
                <h1 className='title'> UPDATE LIST </h1>
            </div>
            <div  className='UpdateList'>
                <form onSubmit={listHandleSubmit} className='updateform'>
                    <div className='updateinput'>
                        <label className='updatelabel'>Name:</label>
                        <input type="text" name="name" value={listFormValues.value} onChange={listHandleChange} required/>
                    </div>
                    <div className='updateinput'>
                        <label className='updatelabel'>Description:</label>
                        <input type="text" name="description" value={listFormValues.value} onChange={listHandleChange} />
                    </div>
                    <div className='updateinput'>
                        <label> Is Public: </label>
                        <input type='checkbox' name='public' value={listFormValues.public} onChange={listHandleChange}/>
                    </div>
                    <button type='submit' className='updatelist'> Update </button>
                </form>
                <button className='deletelist' onClick={() => deleteList()}> Delete List</button>
            </div>
        </div>
    )
}