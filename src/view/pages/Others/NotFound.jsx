import React from 'react';
import NOTFOUND from "../../../assets/images/404.svg";
import {useTitle} from 'react-haiku';

const NotFound = () => {
    useTitle("404!")
    return (
        <div className='center flex-column' style={{ height: '100vh' }}>
            <img src={NOTFOUND} alt="404" className='w-50' style={{
                objectFit: 'contain',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export default NotFound;