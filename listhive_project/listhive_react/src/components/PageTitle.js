import '../styles/PageTitle.css'
import { useContext } from 'react'
import { PageContext } from '../context/PageContext'

export default function PageTitle() {
    const { page } = useContext(PageContext)
    if ( page === 'home' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> WELCOME! </h1>
            </div>
        )
    }
    else if ( page === 'login' ) {
        return (
            <div className='PageTitle'>
                <h1 className='title'> LOGIN </h1>
            </div>
        )
    }
}