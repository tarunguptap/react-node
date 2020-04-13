import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImg from './404.png';
class NotFoundPage extends React.Component{
    render(){
        return <div>
            <img src={PageNotFoundImg}  />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;