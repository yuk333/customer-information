import React from 'react';

function Footer({title}){
    return(
        <div className='footer'>
            <h1>{title}</h1>
            <p>대표자 : 김상곤 | 사업자등록번호 214-86-26812<br/>
통신판매업신고 강남13717호 | 학원등록번호 : 강남 제 1101호<br/>
주소 : 서울시 강남구 역삼동 815-4 만이빌딩 5층, 10층<br/>
COPYRIGHT © 2019 GITACADEMY </p>
        </div>
    );
}
export default Footer;