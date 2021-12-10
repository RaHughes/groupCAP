import React from 'react';
import {Link} from 'react-router-dom';
import { Nav, Navbar as BootNav } from 'react-bootstrap'
import './NavBar.css'

function NavBar( {user, logout} ) {
    return ( 
    <BootNav class="nav">
        {user && <h4>Welcome {user.firstName}</h4>} 
        <ul class='navList'>
            <li>
                <Link class="btn btn-secondary" to='/' > Home </Link>
            </li>
            {!user &&
            <React.Fragment>    
                <li>
                    <Link to='/Login' class="btn btn-secondary"> Login </Link>
                </li>
                <li>
                    <Link to='/Register' class="btn btn-secondary" > Register </Link>
                </li>
            </React.Fragment>}
            {user &&
            <React.Fragment>
                <li>
                    <Link to='/' onClick={() => logout()} class="btn btn-secondary"> Logout </Link>
                </li>
                <li>
                    <Link to='/Sell' class="btn btn-secondary"> Sellers Page </Link>
                </li>
                <li>
                    <Link to='/Cart' class="btn btn-secondary"> Cart </Link>
                </li>
                <li>
                    <Link to ='/Review' class="btn btn-secondary"> Review Page</Link>
                </li>
            </React.Fragment>
            }
        </ul>
    </BootNav> );
    }
 
export default NavBar;
