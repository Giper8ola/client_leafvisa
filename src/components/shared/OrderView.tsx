import React, {FC, memo} from 'react';
import {OrderViewProps} from "@/utils/types/types";

const OrderView: FC<OrderViewProps> = ({icon, value}) => {
    return (
        <div className='tw-flex tw-items-center tw-gap-x-2'>
            <i className={`pi ${icon}`} style={{ color: 'black', fontSize: '1rem' }}></i>
            <div className='tw-px-[4px] tw-py-[1px] tw-bg-[#EDF2F7] tw-rounded-md'>
                <span className='tw-text-sm tw-font-medium tw-mr-2'>{value}</span>
                <i className='pi pi-copy' style={{ color: 'black', fontSize: '1rem' }}></i>
            </div>
        </div>
    );
};

export default memo(OrderView);