import React,{useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import axios from 'axios';
import {Table,TableBody,TableRow,TableCell} from '@material-ui/core';

function UpdateCustomer(){
    const param = useParams();
    const navigate = useNavigate();
    const {id} = param;
    const [gender,setGender] = useState("");
    const onChange= (e) => {
        customer[0].c_gender = e.target.value;
        setGender(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        insertCustomer(e.target);
        navigate(-1);
    }
    function insertCustomer(form){
        axios.put(`http://localhost:8080/editCustomer/${id}`,{
            c_name:form.c_name.value,
            c_gender:form.c_gender.value,
            c_number1:form.c_number1.value,
            c_number2:form.c_number2.value,
            c_gardian:form.c_gardian.value,
            c_addr:form.c_addr.value,
            c_phone:form.c_phone.value,
            c_job:form.c_job.value,
            c_desc:form.c_desc.value
        })
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})
    }

    async function getCustomer() {
        const response = await axios.get(
            `http://localhost:8080/customer/${id}`
        )
        return response.data;
    }
    const datastate = useAsync(getCustomer);
    const { loading, error, data: customer } = datastate;
    if(loading) return <div>로딩중....</div>;
    if(error) return <div>페이지를 나타낼수 없습니다.</div>;
    if(!customer) return null;
    return(
        <div>
            <h2>정보 수정</h2>
            <form onSubmit={onSubmit}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell><input name="c_name" defaultValue={customer[0].c_name}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>
                        여성<input name="c_gender" checked={customer[0].c_gender === '여성' ? true : false } value="여성" type="radio" onChange={onChange}/>
                        남성<input name="c_gender" checked={customer[0].c_gender === '남성' ? true : false } value="남성" type="radio" onChange={onChange}/> 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주민등록번호</TableCell>
                        <TableCell><input name="c_number1" defaultValue={customer[0].c_number1}/> - <input name="c_number2" defaultValue={customer[0].c_number2}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>보호자 이름</TableCell>
                        <TableCell><input name="c_gardian" defaultValue={customer[0].c_gardian}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                       <TableCell><input name="c_addr"  defaultValue={customer[0].c_addr}  /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell><input name="c_phone"  defaultValue={customer[0].c_phone}   /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>직업</TableCell>
                        <TableCell><input name="c_job" defaultValue={customer[0].c_job}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>증상</TableCell>
                        <TableCell><textarea name="c_desc" defaultValue={customer[0].c_desc}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <button type="submit">수정</button>
                            <button>접수리스트</button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </form>
        </div>
    );
}
export default UpdateCustomer;