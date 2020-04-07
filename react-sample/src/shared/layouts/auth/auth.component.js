import React from 'react';
const authLayout = (props) => {
    return (
        <React.Fragment>
            <section className="material-half-bg"></section>
            {props.children}
        </React.Fragment>

    );
}
export default authLayout