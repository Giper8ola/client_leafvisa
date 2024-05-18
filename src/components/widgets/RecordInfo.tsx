import React, {memo} from 'react';
import OrderStatus from "@/components/shared/OrderStatus";
import OrderInfo from "@/components/shared/OrderInfo";
import {Chip} from "primereact/chip";
import ApplicantBlock from "@/components/widgets/ApplicantBlock";
import RecordCalendar from "@/components/shared/RecordCalendar";
import {OrderI} from "@/utils/types/interfaces";
import {OrderStatusEnums} from "@/utils/types/enums";
import {DateStringApplicantDetail} from "@/utils/types/types";
import {v4} from "uuid";

const RecordInfo = ({order}: {order: OrderI}) => {
    return (
        <div className='tw-max-w-full tw-flex tw-mb-5  '>
            <div className='tw-flex-grow tw-flex-shrink tw-min-w-0 max-[800px]:tw-mt-5'>
                <OrderStatus status={order.status as OrderStatusEnums}/>
                <div className='tw-flex tw-flex-col tw-gap-y-6 tw-mb-5'>
                    <OrderInfo value='Отслеживаемые города'>
                        <div className='tw-flex tw-gap-x-3 tw-flex-wrap tw-gap-y-3'>
                            {
                                order.city_names.map((city) => (
                                    <Chip key={v4()} label={city} className='tw-text-sm tw-font-bold'/>
                                ))
                            }
                        </div>
                    </OrderInfo>
                    <OrderInfo value='Отслеживаемые категории'>
                        <div className='tw-flex tw-gap-x-3 tw-flex-wrap tw-gap-y-3'>
                            {
                                order.visa_subcats.map((visa) => (
                                    <Chip key={v4()} label={visa} className='tw-text-sm tw-font-bold' />
                                ))
                            }
                        </div>
                    </OrderInfo>
                    <OrderInfo value='К оплате при записи'>
                        {order.payment}
                    </OrderInfo>
                </div>
                <ApplicantBlock
                    defaultState={false}
                    applicants={order.applicant_details as DateStringApplicantDetail[] | null}
                    amount={order.amount_of_applicants}
                />
                <RecordCalendar
                    dates={order.date_limits}
                    updateData={{
                        isUpdate: true,
                        recordId: order.order_id
                    }}
                />
            </div>
        </div>
    );
};

export default memo(RecordInfo);