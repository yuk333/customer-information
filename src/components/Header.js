import React from 'react';
import { Link } from 'react-router-dom'; 

function Header({title}) {
    return (
        <div className='header'>
            <h1>{title}</h1>
            <ul>
                <li><Link to="/">리스트 보기</Link></li>
                <li><Link to="/create">접수하기</Link></li>
                <li><Link to="/search">검색</Link></li>
            </ul>
        </div>
    );
}
export default Header;