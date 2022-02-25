import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import {Link} from 'react-router-dom';

function Customer({data}){
    return(
        <TableRow>
            <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_no}</Link></TableCell>
            <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_name}</Link></TableCell>
            <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_gender}</Link></TableCell>
            <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_addr}</Link></TableCell>
            <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_phone}</Link></TableCell>
            <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_desc}</Link></TableCell>
        </TableRow>
    );
}
export default Customer;