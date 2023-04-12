import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
    const [lists, setLists] = useState([])
    const [trackers, setTrackers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/lists').then(res => {
            setLists(res.data)
        })
        axios.get('http://localhost:8000/api/trackers').then(res => {
            setTrackers(res.data)
        })
    }, [])

    return (
        <div className='Home'>
            <div className='ft-lists'>
                {lists.map(list => (
                    <div className='ft-list'>
                        <div className='ft-list-name'>
                            <h2>{list.name}</h2>
                        </div>
                        {/* <div className='ft-list-items'>
                            {list.listitem_set.map(item => (
                                <div className='ft-list-item'>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div> */}
                    </div>
                ))}
            </div>
            <div className='ft-trackers'>
                {trackers.map(tracker => (
                    <div className='ft-tracker'>
                        <h2>{tracker.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
