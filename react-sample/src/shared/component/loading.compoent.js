
import React from 'react'

let loadingComponent = (props) => {

    return (
        <React.Fragment>
            {
                props.loading === true &&
                <div className="overlay">
                    <div className="m-loader mr-4">
                        <svg className="m-circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
                        </svg>
                    </div>
                    <h3 className="l-text">Loading</h3>
                </div>
            }
        </React.Fragment>
    )
}


export default loadingComponent