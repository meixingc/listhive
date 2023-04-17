import '../../../styles/Trackers.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"

export default function Trackers() {
    const { trackers, users } = useContext(DataContext)
    
    return (
        <div  className='Trackers'>
            {trackers.slice(-5).reverse().map(tracker => (
                <div className='home-item'>
                    <h2 className='item-title'>{tracker.name}</h2>
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
    )
}