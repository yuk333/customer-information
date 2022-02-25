import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({children}) {
    const title = "접수관리";
    return (
        <div>
            <Header title={title} />
            {children}
            <Footer title={title} />
        </div>
    );
}

export default Layout;