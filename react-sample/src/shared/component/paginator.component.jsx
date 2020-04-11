import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

let paginator = (props) => {
     
    let items = [];
    let totalPages = Math.ceil(props.totalItems/props.itemsPerPage) - props.currentPage <= props.maxPaginationLinkSize ? Math.ceil(props.totalItems/props.itemsPerPage) : (props.currentPage + (props.maxPaginationLinkSize -1))
    for (let number = 1; number <= totalPages; number++) {
    items.push(
        <Pagination.Item onClick={ (ev)=> props.pageChanged({ page : number, itemsPerPage: props.itemsPerPage }) } key={number} active={number === props.currentPage}>
            { number }
        </Pagination.Item>
    ); }
    return(
        props.itemsPerPage <= props.totalItems ?  <Pagination>{ items }</Pagination> : null
    )
}

export default paginator;