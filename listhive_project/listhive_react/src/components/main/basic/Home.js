import '../../../styles/Home.css'
import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../../context/DataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

export default function Home() {
    const navigate = useNavigate()
    const { users, lists, trackers, selectedList, setSelectedList, setSelectedTracker } = useContext(DataContext)
    
    const clickedList = async(id) => {
        setSelectedList(id)
        navigate(`/home/list/${id}`)
    }

    const clickedTracker = (id) => {
        setSelectedTracker(id)
        navigate(`/home/tracker/${id}`)
    }


    return (
        <motion.div className='Home'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='home-sections'>
                <h3 className='home-section-title'> Recent Lists </h3>
                <div className='home-items-ctn'>
                    {lists.slice(-5).reverse().map(list => (
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
            </div>
            <div className='home-sections'>
                <h3 className='home-section-title'> Recent Trackers</h3>
                <div className='home-items-ctn'>
                    {trackers.slice(-5).reverse().map(tracker => (
                        <div className='home-item' onClick={() => clickedTracker(`${tracker.id}`)}>
                            <h2 className='item-title'>{tracker.name}</h2>
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
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>    
    )
}
