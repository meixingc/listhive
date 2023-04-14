import '../../../styles/Home.css'
import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../../context/DataContext'
import axios from 'axios'

export default function Home() {
    const { users, lists, trackers } = useContext(DataContext)

    return (
        <div className='Home'>
            <div className='home-sections'>
                <h3 className='home-section-title'> Recent Lists </h3>
                <div className='home-items-ctn'>
                    {lists.slice(-5).reverse().map(list => (
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
            </div>
            <div className='home-sections'>
                <h3 className='home-section-title'> Recent Trackers</h3>
                <div className='home-items-ctn'>
                    {trackers.slice(-5).reverse().map(tracker => (
                        <div className='home-item'>
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
        </div>    
    )
}
