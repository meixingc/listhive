import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"

export default function ExploreList() {
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
            <div>
                {lists.filter(list => list.id == selectedList).map(list => (
                    <div>
                        <h2>{list.description}</h2>
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
                <ul>
                    {
                        listItems.filter(item => item.list == selectedList).map(item => (
                            <li>
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