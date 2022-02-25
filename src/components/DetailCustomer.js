import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useParams , Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/constants';
function DetailCustomer(){
    const param = useParams();
    const navigate = useNavigate();
    console.log(param);
    const {id} = param;
    async function getCustomer(){
        const response = await axios.get(
            `${API_URL}/customer/${id}`
        )
        return response.data;
    }

    const onDelete = () => {
        axios.delete(`${API_URL}/customer/${id}`)
        .then((result)=>{
            navigate(-1)
        }).catch((err) => {
            console.log(err);
        })
    }

    const state = useAsync(getCustomer);
    const {loading,error,data:customer} = state;
    console.log(customer);
    if(loading) return <div>로딩중...</div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customer) return null;
    return(
        <div>
            <h2>접수 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>{customer[0].c_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>
                        {customer[0].c_gender}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주민등록번호</TableCell>
                        <TableCell>{customer[0].c_number1} - {customer[0].c_number2}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>보호자 이름</TableCell>
                        <TableCell>{customer[0].c_gardian}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                       <TableCell>{customer[0].c_addr}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{customer[0].c_phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>직업</TableCell>
                        <TableCell>{customer[0].c_job}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>증상</TableCell>
                        <TableCell>{customer[0].c_desc}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <button onClick={onDelete}>삭제</button>
            <button><Link to={`/edit/${customer[0].c_no}`}>수정</Link></button>
            <button onClick={(e)=> (e.preventDefault())}><Link to="/">리스트보기</Link></button>
        </div>
    );
}
export default DetailCustomer;