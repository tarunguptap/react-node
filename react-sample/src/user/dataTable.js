import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.userdata.name}
                </td>
                <td>
                    {this.props.userdata.email}
                </td>
                <td>
                    {this.props.userdata.username}
                </td>
            </tr>
        );
    }
}

export default DataTable;