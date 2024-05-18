import React, {FC, memo} from 'react';
import {OrderInputProps} from "@/utils/types/types";

const OrderInput: FC<OrderInputProps> = ({children, value}) => {
    return (
        <div className='
            tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-items-center tw-text-sm
            max-[500px]:tw-grid-rows-2 max-[500px]:tw-grid-cols-1'
        >
            <div className='tw-font-bold'>
                {value}
            </div>
            {children}
        </div>
    );
};

export default memo(OrderInput);