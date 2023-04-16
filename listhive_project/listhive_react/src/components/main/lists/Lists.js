import '../../../styles/Lists.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"

export default function Lists() {
    const { lists, users } = useContext(DataContext)

    return (
        <div className="Lists">
            {lists.map(list => (
                <div className='home-item'>
                    <h2 className='item-title'>{list.name}</h2>
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
    )
}