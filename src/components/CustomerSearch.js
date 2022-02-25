import React, { useState } from 'react';
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/constants';
import { Table, TableBody, TableHead,TableCell, TableRow } from '@material-ui/core';
import Customer from './Customer';
async function getCustomers(){
    const response = await axios.get(
        `${API_URL}/customers`
    )
    return response.data;
}
function CustomerSearch() {
    const [searchText, setSearchText ] = useState("");
    const [searchSelect, setSearchSelect ] = useState("");
    const [filterCustomer, setFilterCustomer ] = useState([]);
    const onChange = (e) => {
        const textValue = e.target.value;
        setSearchSelect(textValue);
    }
    const searchClick = () => {
        const searchCustomers = customers.filter( customer => {
            if(searchSelect === "이름"){
                console.log('안돼1');
                return customer.c_name.includes(searchText); 
            }else if(searchSelect === "주소"){
                console.log('안돼2');
                return customer.c_addr.includes(searchText); 
            }else if(searchSelect === "연락처"){
                console.log('안돼3');
                return customer.c_phone.includes(searchText); 
            }else {
                console.log('안돼');
            }
        });
        setFilterCustomer(searchCustomers);
        console.log(searchCustomers);
    }
    const inputChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        console.log(searchText);
        
    }
    const state = useAsync(getCustomers);
    const { loading, error, data: customers } = state;
    console.log(customers);
    //로딩중이라면?
    if(loading) return <div>로딩중.....</div>
    //에러가 발생했다면?
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customers) return null;

    
    return (
    
        <div>
           <h2>접수 검색하기</h2> 
           <div>
               <select name="selectSearch" onChange={onChange}>
                   <option>검색을 선택해주세요</option>
                   <option value="이름">이름</option>
                   <option value="주소">주소</option>
                   <option value="연락처">연락처</option>
               </select>
               <input type="text" name="searchText" value={searchText} onChange={inputChange}/>
               <button onClick={searchClick}>검색</button>
           </div>
           <div>
            <h2>고객리스트</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>주소</TableCell>
                        <TableCell>증상</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterCustomer.map(data=>(
                      <Customer data={data} key={data.c_no} />
                    ))}
                </TableBody>
            </Table>
        </div>
        </div>
    );
}

export default CustomerSearch;