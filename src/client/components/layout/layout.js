import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = (props) =>{
    return(
        <div
        className="layout">
        <Header/>
        <div className="main-content">
          {props.children}
        </div>
        <Footer />
      </div>
    );
}

export default Layout;