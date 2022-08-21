import {Link} from 'react-router-dom'
import SideNavigation from './sideNavigation';

const Header = ()=>{


    return (

        <nav className="navbar fixed-top ">
        <Link to ='/' className="navbar-brand d-flex align-items-center fredoka_ff">
        The Final Project
        </Link>
        <SideNavigation/>
        </nav>
    )
}


export default Header;