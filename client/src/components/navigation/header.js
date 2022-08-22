import { Link } from 'react-router-dom'
import SideNavigation from './sideNavigation';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import {clearNotifications} from '../../store/reducers/notifications'
import { showToast } from '../../utilis/tools';
const Header = () => {
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()


    useEffect(() => {
        let { global } = notifications;
        if(notifications&& global.error){
            const msg = global.msg ? global.msg : 'Error'
            showToast('ERROR', msg)
            dispatch(clearNotifications())

        }
        if(notifications&& global.success){
            const msg = global.msg ? global.msg : 'success'
            showToast('SUCCESS', msg)
            dispatch(clearNotifications())
        }
    }, [notifications])
    return (

        <nav className="navbar fixed-top ">
            <Link to='/' className="navbar-brand d-flex align-items-center fredoka_ff">
                The Final Project
            </Link>
            <SideNavigation />
        </nav>
    )
}


export default Header;