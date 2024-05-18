import React from 'react';
import RecordHead from "@/components/shared/RecordHead";
import OrderStatus from "@/components/shared/OrderStatus";
import {OrderStatusEnums} from "@/utils/types/enums";
import {OrderI} from "@/utils/types/interfaces";

const DefaultRecordPage = ({order}: {order: OrderI}) => {
    return (
        <div className='tw-px-6 tw-pt-6'>
            <RecordHead country={order.country}/>
            <div className='tw-flex tw-justify-center'>
                <OrderStatus status={order.status as OrderStatusEnums}/>
            </div>
        </div>
    );
};

export default DefaultRecordPage;