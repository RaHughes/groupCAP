import React from 'react';
import {Link} from 'react-router-dom';

function NavBar( {user} ) {
    return ( 
    <nav>
        {user && <h4>Welcome {user.username}</h4>} 
        <ul>
            <li>
                <Link to='/' > Home </Link>
            </li>
            {!user &&
            <React.Fragment>    
                <li>
                    <Link to='/Login' > Login </Link>
                </li>
            </React.Fragment>}
            {user &&
            <React.Fragment>
                <li>
                    <Link to='/Logout' > Logout </Link>
                </li>
                <li>
                    <Link to='/Sell' > Sell </Link>
                </li>
            </React.Fragment>
            }
        </ul>
    </nav> );
    }
 
export default NavBar;
