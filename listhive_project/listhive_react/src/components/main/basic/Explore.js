import { useContext, useEffect, useState} from 'react'
import '../../../styles/Explore.css'
import { DataContext } from '../../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


export default function Explore() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const { users, lists, trackers, searchResultsLists, setSearchResultsLists, searchResultsTrackers, setSearchResultsTrackers, searchResultsUsers, setSearchResultsUsers } = useContext(DataContext)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchResultsLists(lists.filter(list => list.name.toLowerCase().includes(search.toLowerCase())))
        setSearchResultsTrackers(trackers.filter(tracker => tracker.name.toLowerCase().includes(search.toLowerCase())))
        setSearchResultsUsers(users.filter(user => user.username.toLowerCase().includes(search.toLowerCase())))
        setSearch('')

        navigate('/explore/search/results')
    }

    useEffect(() => {   
        console.log(searchResultsLists)
        console.log(searchResultsTrackers)
        console.log(searchResultsUsers)
    }, [searchResultsLists, searchResultsTrackers, searchResultsUsers])

    return (
        <motion.div className='Explore'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <form onSubmit={handleSubmit}>
                <input className='explore-search' type='text' value={search} placeholder='Search for lists, trackers, or users' onChange={handleChange}/>
                <button type='submit' className='explore-search-btn'> Search </button>
            </form>
            <div className='explore-top-row'>
                <h1 className='explore-options' onClick={() => navigate('/explore/lists')}> Lists </h1>
                <h1 className='explore-options' onClick={() => navigate('/explore/trackers')}> Trackers </h1>
            </div>
            <div className='explore-bottom-row'>
                <h1 className='explore-options'> Trending </h1>
                <h1 className='explore-options' onClick={() => navigate('/explore/creators')}> Creators </h1>
            </div> 
        </motion.div>
    )
}