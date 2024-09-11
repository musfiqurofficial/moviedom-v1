import React from 'react';
import { A } from '../../../style/common/Tag';
import { NavLink } from 'react-router-dom';
import { P } from '../../../style/typography/typography';
import { getTMDBimgPath } from '../../../lib/tools';
import Image from './Image';

const CastCard = ({ cast }) => {

    return (
        <A as={NavLink} to={`/cast/${cast.id}`} className="w-100" title={cast?.original_name}>
            <Image poster src={getTMDBimgPath('w185', cast?.profile_path)} alt={cast?.original_name} className='w-100' />
            <P className='line-1'>{cast?.original_name}</P>
        </A>
    );
};

export default CastCard;