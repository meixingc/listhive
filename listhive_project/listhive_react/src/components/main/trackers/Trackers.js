import '../../../styles/Trackers.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useNavigate} from "react-router-dom"

export default function Trackers() {
    const navigate = useNavigate()
    const { trackers, users, setSelectedTracker } = useContext(DataContext)

    const clickedList = (id) => {
        setSelectedTracker(id)
        navigate(`/explore/trackers/${id}`)
    }

    
    return (
        <div  className='Trackers'>
            {trackers.slice(-5).reverse().map(tracker => (
                <div className='home-item'  onClick={() => clickedList(`${tracker.id}`)}>
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