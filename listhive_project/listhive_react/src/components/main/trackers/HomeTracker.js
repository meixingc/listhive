import '../../../styles/HomeTracker.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"

export default function HomeTracker() {
    const { trackers, selectedTracker, trackerFields, trackerItems, trackerItemValues, users } = useContext(DataContext)
    console.log('selectedTracker', selectedTracker)
    if (selectedTracker) {
    return (
        <div>
            <div className='PageTitle'>
                {trackers.filter(tracker => tracker.id == selectedTracker).map(tracker => (
                    <h1 className='title'> {tracker.name} </h1>
                ))}
            </div>
            <div className='HomeTracker'>
                {trackers.filter(tracker => tracker.id == selectedTracker).map(tracker => (
                    <div className='trackerinfo'>
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
                        <h2 className='trackerdesc'>{tracker.description}</h2>
                    </div>
                ))}
                <ul className='trackeritems'>
                    {
                        trackerItems.filter(item => item.tracker == selectedTracker).map(item => (
                            <li className='trackeritem'>
                                <h3>{item.value}</h3>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
    }
}