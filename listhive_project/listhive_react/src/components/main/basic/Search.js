import '../../../styles/Search.css'

import { DataContext } from '../../../context/DataContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate()
    const { users, searchResultsLists, searchResultsTrackers, searchResultsUsers } = useContext(DataContext)
    
    return (
        <div className='Search'>
            <button className='search-back-btn' onClick={() => navigate('/explore')} > Back </button>
            <div className='search-section'>
                <h1 className='search-section-title'>Lists</h1>
                {searchResultsLists.map(list => (
                    <div>
                        <h2>{list.name}</h2>
                        {users.map(user => {
                            if (user.id === list.owner) {
                                return (
                                    <div className='home-user'>
                                        <img src={user.photo} className='user-photo'/>
                                        <h4 className='user-username'> {user.username} </h4>
                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>
            <div className='search-section'>
                <h1>Trackers</h1>
                {searchResultsTrackers.map(tracker => (
                    <div>
                        <h2>{tracker.name}</h2>
                        {users.map(user => {
                            if (user.id === tracker.owner) {
                                return (
                                    <div className='home-user'>
                                        <img src={user.photo} className='user-photo'/>
                                        <h4 className='user-username'> {user.username} </h4>
                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>
            <div className='search-section'>
                <h1>Users</h1>
                {searchResultsUsers.map(user => (
                    <div>
                        <img src={user.photo}/>
                        <h2>{user.username}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}