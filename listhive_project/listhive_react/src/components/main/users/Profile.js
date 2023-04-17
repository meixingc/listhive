import { UserContext } from '../../../context/UserContext'
import { DataContext } from '../../../context/DataContext'
import { useContext } from 'react'

export default function Profile() {
    const { user } = useContext(UserContext)
    const { users, lists, trackers } = useContext(DataContext)
    return (
        <div>
            <div>
                {
                    users.filter(User => User.id === user.id).map(User => {
                        return (
                            <div>
                                <h1>{User.name}</h1>
                                <h1>{User.username}</h1>
                                <h2>{User.email}</h2>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div>
                    <h1> Created Lists </h1>
                    <div>
                        {
                            lists.filter(list => list.owner === user.id).map(list => {
                                return (
                                    <div>
                                        <h2>{list.title}</h2>
                                        <h3>{list.description}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <h1> Created Trackers </h1>
                    <div>
                        {
                            trackers.filter(tracker => tracker.owner === user.id).map(tracker => {
                                return (
                                    <div>
                                        <h2>{tracker.title}</h2>
                                        <h3>{tracker.description}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
            
    )
}