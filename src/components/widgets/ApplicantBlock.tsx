import React, {FC, useEffect, useRef, useState} from 'react';
import ApplicantInit from "@/components/widgets/ApplicantInit";
import {useOrderStore} from "@/providers/order-store-provider";
import ApplicantView from "@/components/widgets/ApplicantView";
import type {ApplicationBlockProps, DateStringApplicantDetail} from "@/utils/types/types";
import {Toast} from "primereact/toast";

const ApplicantBlock: FC<ApplicationBlockProps> = ({defaultState, amount, applicants}) => {
    const toastRef = useRef<Toast>(null)
    const [cur, setCur] = useState<number>(0)
    const {details, pushApplicant} = useOrderStore(store => store)
    const [app, setApp] = useState(applicants ? applicants[0] : null)

    useEffect(() => {
        if(applicants)
            setApp(applicants[cur])
    }, [cur, applicants])

    if(!applicants && !defaultState)
        return (
            <div>
                Данных нету(
            </div>
        )

    return (
        <div className='tw-w-full tw-drop-shadow-md tw-bg-white tw-relative tw-px-5 tw-py-4 tw-rounded-xl'>
            <Toast ref={toastRef}/>
            <div className='tw-absolute tw-flex tw-gap-x-3 tw-items-center tw-right-5 tw-top-4'>
                <div className='pi pi-arrow-left tw-px-1 tw-py-2 tw-border-2 tw-border-[#CBD5E1] tw-rounded-lg tw-cursor-pointer'
                     style={{color: '#636F80', fontSize: '.8rem'}}
                     onClick={() => {
                         setCur(s => s == 0 ? 0 : s - 1)
                     }}
                ></div>
                <div>{`${cur + 1} / ${defaultState ? amount : applicants?.length}`}</div>
                <div className='pi pi-arrow-right tw-px-1 tw-py-2 tw-border-2 tw-border-[#CBD5E1] tw-rounded-lg tw-cursor-pointer'
                     style={{color: '#636F80', fontSize: '.8rem'}}
                     onClick={() => {
                         if(
                             (
                                 (defaultState ? amount - 1 : applicants?.length! - 1)
                                    ||
                                 (defaultState && details.length <= cur)
                             )
                             && defaultState
                             && cur + 1 !== amount
                             && !(cur + 1 <= details.length)
                         )
                             toastRef.current?.show({severity: "info", summary: 'Заполните данные заявителя', detail: `Заполните данные заявителя №${cur + 1}, чтобы перейти к следующему`})
                         setCur(s => s == (defaultState ? amount - 1 : applicants?.length! - 1) || (defaultState && details.length <= s) ? s : s + 1)
                     }}
                >
                </div>
            </div>
            {
                defaultState
                    ?
                        <ApplicantInit cur={cur} setCur={setCur} amount={amount}/>
                    :
                        <ApplicantView applicant={app as DateStringApplicantDetail}/>

            }
        </div>
    );
};

export default ApplicantBlock;