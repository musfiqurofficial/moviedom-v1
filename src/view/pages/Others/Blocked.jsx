import React from 'react';
import { H3 } from '../../../style/typography/typography';
import {useTitle} from 'react-haiku';

const Blocked = () => {
    
    useTitle('⛔ Blocked !')

    return (
        <div className='center flex-column' style={{ minHeight: '100vh' }}>
            <div className='alert-page-icon center danger'>
                <i className="fa-solid fa-ban"></i>
            </div>
            <div className="mt-3 text-center">
                <H3 color='dark' >This domain/IP is not allowed here.</H3>
            </div>
        </div>
    );
};

export default Blocked;