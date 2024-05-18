import React, {memo} from 'react';
import {Avatar} from "primereact/avatar";
import Image from "next/image";

const RecordHead = ({country}: {country: string}) => {
    return (
        <div className='tw-flex tw-justify-between'>
            <div className='tw-flex tw-items-center tw-text-sm tw-gap-x-3'>
                <Avatar label="L" size="xlarge" shape="circle" style={{backgroundColor: '#2196F3', color: 'white'}} />
                <div>
                    <p>Здравствуйте</p>
                    <p>Страна подачи: <span className='tw-font-bold'>{country}</span></p>
                </div>
            </div>
            <div>
                <Image src='/france_leaf.png' alt='Логотип Leaf Visa с флагом Франции' width={56} height={56}/>
            </div>
        </div>
    );
};

export default memo(RecordHead);