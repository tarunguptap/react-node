import React from 'react';
import  Header  from './../../elements/header.compoent'
import  Sidebar  from './../../elements/sidebar.compoent'
const adminLayout = (props) => {
    // For now we are not using the layout and we have used withRoute in admin and sidebar components
    return (
        <React.Fragment>
            <Header></Header>
            <Sidebar></Sidebar>
            <main className="app-content">
                {props.children}
            </main>
        </React.Fragment>
    );
}
export default adminLayout