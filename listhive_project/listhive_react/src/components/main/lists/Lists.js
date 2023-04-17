import '../../../styles/Lists.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useNavigate} from "react-router-dom"

export default function Lists() {
    const navigate = useNavigate()
    const { lists, users, setSelectedList } = useContext(DataContext)

    const clickedList = (id) => {
        setSelectedList(id)
        navigate(`/explore/lists/${id}`)
    }


    return (
        <div className="Lists">
            {lists.map(list => (
                <div className='home-item' onClick={() => clickedList(`${list.id}`)}>
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