import React from 'react';
import {NavLink} from 'react-router-dom';


const Dashboard = (props) =>{
    return(

        <div className="dashboard">
           <nav>
                <ul className="header container">
                <li><NavLink exact to='/quizes'>Quizes</NavLink></li>
                <li><NavLink to='/question'>Questions</NavLink></li>
                <li><NavLink to='/logout'>Logout</NavLink></li>
                </ul>
            </nav>
            
            <div className="container content">
            {props.children}
            </div>

        </div> 
    );
}

export default Dashboard;