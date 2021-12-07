import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
    return ( 
    <nav>
        <ul>
            <Link to='/'>
                <li>Home</li>
            </Link>
            <Link to='/Login'>
                <li>Login</li>
            </Link>
            <Link to='/Sell'>
                <li>Sell</li>
            </Link>
        </ul>
    </nav> );
    }
 
export default NavBar;
