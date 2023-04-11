import '../styles/Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='Footer'>
            <div className='footer-text-ctn'>
                <Link to='/about' className='footer-text'> About Me </Link>
                <p className='footer-text'> | </p>
                <a href='https://www.meixingc.com' target='_blank' className='footer-text'> Portfolio </a>
                <p className='footer-text'> | </p>
                <a href='https://www.linkedin.com/in/meixingc/' target='_blank' className='footer-text'> LinkedIn </a>
                <p className='footer-text'> | </p>
                <a href='https://github.com/meixingc' target='_blank' className='footer-text'> GitHub </a>
            </div>
        </div>
    )
}