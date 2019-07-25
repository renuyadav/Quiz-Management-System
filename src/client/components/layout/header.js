import React from 'react';
import {connect} from 'react-redux';

const HeaderComp =(props) =>{
    return(
        <div className="header">
            <h1>Quiz Maker</h1>
            {props.currentUser ?<span className="loggedin-user">Welcome {props.currentUser}</span>:null}
        </div>
    );
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});
const Header = connect(mapStateToProps)(HeaderComp);
export default Header;