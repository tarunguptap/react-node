/**
 * 
 * @name :-  User Form
 * @description :- reusable form for create & update user
 * 
 * @author Tarun
 */

import React from 'react'
import LoadingComponent from '../../shared/component/loading.compoent'

let UserForm = (props) => {
    let roleOptions = [
        { name: "Admin", value: "admin" },
        { name: "Manager", value: "manager" },
        { name: "Auditor", value: "auditor" },
        { name: "Qms", value: "qms" }
    ]
    return (
        <form className="form-horizontal" onSubmit={(event) => props.submitHandler(event)}>
            <div className="tile">
                <h3 className="tile-title">{ props.title }</h3>
                <div className="tile-body">
                    <div className="form-group row">
                        <label className="control-label col-md-3">Name</label>
                        <div className="col-md-4">
                            <input className="form-control" type="text" placeholder="Enter First Name" name="first_name" value={props.fields.first_name} onChange={(event) => props.stateUdateHandler(event)} />
                        </div>

                        <div className="col-md-4">
                            <input className="form-control" type="text" placeholder="Enter Last Name" name="last_name" value={props.fields.last_name} onChange={(event) => props.stateUdateHandler(event)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-md-3">Email</label>
                        <div className="col-md-8">
                            <input  className="form-control col-md-8" type="email" placeholder="Enter email address" name="email" value={props.fields.email} onChange={(event) => props.stateUdateHandler(event)} disabled={ props.fields._id != ''} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-md-3">Role { props.fields.role}</label>
                        <div className="col-md-4">
                            <select name="role" className="form-control" onChange={(event) => props.stateUdateHandler(event)} disabled={ props.fields._id != ''} >
                                <option>Select a role</option>
                                { roleOptions.map(i => i.value == props.fields.role ? (
                                    <option key={ i.value } value={i.value} selected>
                                        {i.name}
                                    </option>
                                ) : (<option key={ i.value } value={i.value}>{i.name}</option>))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-md-3">Contact</label>
                        <div className="col-md-8">
                            <input className="form-control col-md-8" type="text" placeholder="Enter contact number" name="contact" value={props.fields.contact} onChange={(event) => props.stateUdateHandler(event)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-md-3">Team</label>
                        <div className="col-md-8">
                            <input className="form-control col-md-8" type="text" placeholder="Enter team name" name="team" value={props.fields.team} onChange={(event) => props.stateUdateHandler(event)} />
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="control-label col-md-3">Expertise</label>
                        <div className="col-md-8">
                            <textarea defaultValue={props.fields.expertise} className="form-control" rows="4" placeholder="Enter Expertise" name="expertise" onChange={(event) => props.stateUdateHandler(event)}>
                            </textarea>
                        </div>
                    </div>


                </div>

                <div className="tile-footer">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-3">
                            <button className="btn btn-primary" type="submit"><i className="fa fa-fw fa-lg fa-check-circle"></i>Submit</button>
                        </div>
                    </div>
                </div>
                <LoadingComponent loading={props.fields.loading}></LoadingComponent>
            </div>
        </form>

    )
}

export default UserForm;