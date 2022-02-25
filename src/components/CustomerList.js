import React from 'react';
import { Table, TableBody, TableHead,TableCell, TableRow } from '@material-ui/core';
import Customer from './Customer';
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/constants';

async function getCustomers(){
    const response = await axios.get(
        `${API_URL}/customers`
    )
    return response.data;
}
function CustomerList(){
    const state = useAsync(getCustomers);
    const {loading,error,data:customers} = state;
    if(loading) return <div>로딩중...</div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customers) return null;
    return(
        <div>
            <h2>병원접수 목록</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                        <TableCell>전화번호</TableCell>
                        <TableCell>증상</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map(data=>(
                        <Customer data={data} key={data.c_no}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
export default CustomerList;