import React, {FC, ReactNode} from 'react';
import {OrderInputProps} from "@/utils/types/types";

const OrderInfo: FC<OrderInputProps> = ({value, children}) => {
    return (
        <div className='tw-grid tw-grid-rows-1 tw-grid-cols-2 tw-items-center tw-text-sm'>
            <p className='tw-font-bold'>{value}</p>
            {children}
        </div>
    );
};

export default OrderInfo;