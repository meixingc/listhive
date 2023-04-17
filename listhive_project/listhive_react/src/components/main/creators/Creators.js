import '../../../styles/Creators.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"

export default function Creators() {
    const { users } = useContext(DataContext)

    return (
        <div className="Creators">
            {users.map(user => {
                return (
                    <div className='home-item'>
                        <div className='home-user'>
                            <img src={user.photo} className='user-photo'/>
                            <h4 className='user-username'> {user.username} </h4>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}