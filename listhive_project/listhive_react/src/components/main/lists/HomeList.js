import '../../../styles/HomeList.css'

import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"

export default function HomeList() {
    const { lists, selectedList, listItems, users } = useContext(DataContext)
    console.log('selectedlist', selectedList)
    if (selectedList) {
    return (
        <div>
            <div className='PageTitle'>
                {lists.filter(list => list.id == selectedList).map(list => (
                    <h1 className='title'> {list.name} </h1>
                ))}
            </div>
            <div className="HomeList">
                {lists.filter(list => list.id == selectedList).map(list => (
                    <div className='listinfo'>
                        {users.map(user => {
                                if (user.id === list.owner) {
                                    return (
                                        <div className='home-user'> 
                                            <h4> Created By : </h4>
                                            <img src={user.photo} className='user-photo'/>
                                            <h4 className='user-username'> {user.username} </h4>
                                        </div>
                                    )
                                }
                        })}
                        <h2 className='listdesc'>{list.description}</h2>
                    </div>
                ))}
                <ul className='listitems'>
                    {
                        listItems.filter(item => item.list == selectedList).map(item => (
                            <li className='listitem'>
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