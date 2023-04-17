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
            <div className='searchresults'>
                <div className='search-section'>
                    <h1 className='searchsectiontitle'>Lists</h1>
                    <div className='searchscroll'>
                        {searchResultsLists.map(list => (
                            <div className='searchitem'>
                                <h2 className='searchname'>{list.name}</h2>
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
                </div>
                <div className='search-section'>
                    <h1 className='searchsectiontitle'>Trackers</h1>
                    <div className='searchscroll'>
                        {searchResultsTrackers.map(tracker => (
                            <div className='searchitem'>
                                <h2 className='searchname'>{tracker.name}</h2>
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
                </div>
                <div className='search-section'>
                    <h1 className='searchsectiontitle'>Users</h1>
                    <div className='searchscroll'>
                        {searchResultsUsers.map(user => (
                            <div className='searchusers'>
                                <div className='home-user'>
                                    <img src={user.photo} className='user-photo'/>
                                    <h2>{user.username}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}