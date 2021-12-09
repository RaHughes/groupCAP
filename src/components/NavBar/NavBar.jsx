import React from 'react';
import {Link} from 'react-router-dom';

function NavBar( {user, logout} ) {
    return ( 
    <nav>
        {user && <h4>Welcome {user.firstName}</h4>} 
        <ul>
            <li>
                <Link to='/' > Home </Link>
            </li>
            {!user &&
            <React.Fragment>    
                <li>
                    <Link to='/Login' > Login </Link>
                </li>
                <li>
                    <Link to='/Register' > Register </Link>
                </li>
            </React.Fragment>}
            {user &&
            <React.Fragment>
                <li>
                    <Link to='/' onClick={() => logout()}> Logout </Link>
                </li>
                <li>
                    <Link to='/Sell' > Sellers Page </Link>
                </li>
                <li>
                    <Link to='/Cart' > Cart </Link>
                </li>
                <li>
                    <Link to ='/Review'> Review Page</Link>
                </li>
            </React.Fragment>
            }
        </ul>
    </nav> );
    }
 
export default NavBar;
