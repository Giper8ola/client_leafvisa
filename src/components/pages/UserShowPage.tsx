import React from 'react';
import RecordInfo from "@/components/widgets/RecordInfo";
import {OrderI} from "@/utils/types/interfaces";
import RecordHead from "@/components/shared/RecordHead";

const UserShowPage = ({order}: {order: OrderI}) => {
    return (
        <div className='tw-px-6 tw-pt-6'>
            <RecordHead country={order.country}/>
            <div className='tw-max-w-2xl tw-w-full tw-mx-auto tw-my-0'>
                <RecordInfo order={order}/>
            </div>
        </div>
    );
};

export default UserShowPage;