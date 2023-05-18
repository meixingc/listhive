import '../../../styles/Profile.css'

import { UserContext } from '../../../context/UserContext'
import { DataContext } from '../../../context/DataContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Profile() {
    const navigate = useNavigate
    const { user } = useContext(UserContext)
    const { users, lists, trackers, setUpdateList } = useContext(DataContext)

    const clickedList = (id) => {
        setUpdateList(id)
        navigate(`/update/list/${id}`)
    }

    return (
        <motion.div className='Profile'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='profileuser'>
                {
                    users.filter(User => User.id === user.id).map(User => {
                        return (
                            <div className='profileuserctn'>
                                <img src={User.photo} className='profile-photo'/>
                                <h1 className='profileusername'>{User.username}</h1>
                            </div>
                        )
                    })
                }
            </div>
            <div className='profilecreated'>
                <div className='profilesection'>
                    <h1 className='profilesectiontitle'> Created Lists </h1>
                    <div>
                        {
                            lists.filter(list => list.owner === user.id).map(list => {
                                return (
                                    <div>
                                        <h2 onClick={() => clickedList(list.id)}>{list.name}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='profilesection'>
                    <h1 className='profilesectiontitle'> Created Trackers </h1>
                    <div>
                        {
                            trackers.filter(tracker => tracker.owner === user.id).map(tracker => {
                                return (
                                    <div>
                                        <h2>{tracker.name}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </motion.div>
            
    )
}