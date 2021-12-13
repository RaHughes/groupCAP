import React from 'react';
import {Link} from 'react-router-dom';
import { Nav, Navbar as BootNav } from 'react-bootstrap'
import './NavBar.css'

function NavBar( {user, logout} ) {
    return ( 
    <BootNav className="nav">
        <h1 className='NavHeader'>Game Stop Lite</h1>
        {user && <h4>Welcome {user.firstName}</h4>} 
        <ul class='navList'>
            <li>
                <Link className="btn btn-secondary" to='/' > Home </Link>
            </li>
            {!user &&
            <React.Fragment>    
                <li>
                    <Link to='/Login' className="btn btn-secondary"> Login </Link>
                </li>
                <li>
                    <Link to='/Register' className="btn btn-secondary" > Register </Link>
                </li>
            </React.Fragment>}
            {user &&
            <React.Fragment>
                <li>
                    <Link to='/' onClick={() => logout()} className="btn btn-secondary"> Logout </Link>
                </li>
                <li>
                    <Link to='/Sell' className="btn btn-secondary"> Sellers Page </Link>
                </li>
                <li>
                    <Link to='/Cart' className="btn btn-secondary"> Cart 🛒</Link>
                </li>
                <li>
                    <Link to ='/Review' className="btn btn-secondary"> Review Page</Link>
                </li>
            </React.Fragment>
            }
        </ul>
    </BootNav> );
    }
 
export default NavBar;
