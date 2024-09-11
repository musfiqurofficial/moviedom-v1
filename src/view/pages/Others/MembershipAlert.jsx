import React from 'react';
import { H2 } from '../../../style/typography/typography';
import {useTitle} from 'react-haiku';
const MembershipAlert = () => {
    useTitle('Renew Membership - MovieDom')
    return (
        <div className='center flex-column' style={{ minHeight: '100vh' }}>
            <div className='alert-page-icon center warn'>
                <i className="fa-solid fa-bell"></i>
            </div>
            <div className="mt-3 text-center">
                <H2 color='dark' >Your membership is expired.</H2>
                <p className="text-text">Please renew your membership.</p>
            </div>
        </div>
    );
};

export default MembershipAlert;