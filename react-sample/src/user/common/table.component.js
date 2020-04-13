import React from 'react'
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

let table = (props) => {
    let listItems = props.list.map(function (item, index) {
        return (
            <tr key={item.id}>
                <td>{index + (((props.currentPage-1)*props.itemsPerPage)+1)}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>
                    <Link to={`/users-update/${item.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                                    &nbsp; &nbsp; | &nbsp; &nbsp;
                    <Link to={`/users-view/${item.id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link>
                </td>
            </tr>
        );
    });
    return (
        <React.Fragment>
            <div className="table-search">
                <InputGroup className="mb-3 col-sm-6">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={(event) => props.search(event)}
                        className="search-input"
                        placeholder="Search....."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
            
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.length === 0 ? (<tr><td colSpan="5"><h3>No Records!!!</h3></td></tr>) :( listItems)}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )

}

export default table;