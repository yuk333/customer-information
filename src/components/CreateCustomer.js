import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/constants';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';


function CreateCustomer() {
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_addr:data.address
        });
    }
    const [isPopupOpen,setIsPopupOpen] = useState(false)
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    const closePostCode = () => {
        setIsPopupOpen(false);
    }
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        c_name:"", //이름
        c_gender:"", //성별
        c_number1:"", //주민등록번호1
        c_number2:"", //주민등록번호2
        c_gardian:"", //보호자 성함
        c_addr:"", //주소
        c_addrdetail:"", //주소 팝업 
        c_phone:"", //전화번호
        c_job:"" //직업
        
    })
    const onChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        console.log(name,value);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(isNaN(formData.c_phone)){
            alert("전화번호는 숫자만 입력해주세요");
            setFormData({
                ...formData,
                c_phone:""
            });
            return null;
        }
        if(formData.c_name !=="" && formData.c_gender !=="" && formData.c_number1 !=="" && formData.c_number2 !==""
        && formData.c_gardian !== "" && formData.c_addr !== "" && formData.c_phone !== "" && formData.job !== ""){
            insertCustomer();
        }
        setFormData({
            c_name:"",
            c_gender:"", 
            c_number1:"", 
            c_number2:"",
            c_gardian:"", 
            c_addr:"", 
            c_phone:"", 
            c_job:"" 
        })
    }
    const onReset = () => {
        setFormData({
            c_name:"",
            c_gender:"", 
            c_number1:"", 
            c_number2:"",
            c_gardian:"", 
            c_addr:"", 
            c_phone:"", 
            c_job:"" 
        })
    }
    function insertCustomer(){
        axios.post(`${API_URL}/addCustomer`,formData)
        .then(function(res){
            console.log(res);
            navigate(-1);
        }).catch(function(err){
            console.log(err);
        })
    }
    return(
        <div>
            <h2>병원 접수하기</h2>
            <form onSubmit={onSubmit}>
                <Table className='createTable'>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                이름
                            </TableCell>
                            <TableCell>
                                <input name="c_name" type="text" valu={formData.c_name} onChange={onChange} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                성별
                            </TableCell>
                            <TableCell>
                                여성 <input name="c_gender" type="radio" value="여성" onChange={onChange} />
                                남성 <input name="c_gender" type="radio" value="남성" onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                주민등록번호
                            </TableCell>
                            <TableCell>
                                <input name="c_number1" type="number" value={formData.c_number1} onChange={onChange}/> - <input name="c_number2" type="number" value={formData.c_number2} onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                보호자 성함
                            </TableCell>
                            <TableCell>
                                <input name="c_gardian" type="text" value={formData.c_gardian} onChange={onChange} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                주소
                            </TableCell>
                            <TableCell>
                                <input name="c_addr" type="text" value={formData.c_addr} onChange={onChange} required />
                                <input name="c_addrdetail" type="text" value={formData.c_addrdetail} onChange={onChange} required placeholder='상세주소를 입력하세요'/>
                                <button type='button' onClick={openPostCode}>우편번호 검색</button>
                                <div id='popupDom'>
                                {isPopupOpen && (
                                    <PopupDom>
                                      <PopupPostCode onClose={closePostCode} onAddData={onAddData}  />
                                    </PopupDom>
                                )}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                연락처
                            </TableCell>
                            <TableCell>
                                <input name="c_phone" value={formData.c_phone} type="number" onChange={onChange} required placeholder='숫자만 적어주세요.'/> 
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                직업
                            </TableCell>
                            <TableCell>
                                <input name="c_job" value={formData.c_job} type="text" onChange={onChange} required/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>증상</TableCell>
                            <TableCell>
                                
                                    <textarea rows ="5" cols="84" name="c_desc" value={formData.c_desc} type="text" onChange={onChange} required/>
                                
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset" onClick={onReset}>취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
}
export default CreateCustomer;