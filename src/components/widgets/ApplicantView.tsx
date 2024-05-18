import React, {FC} from 'react';
import OrderView from "@/components/shared/OrderView";
import {ApplicantViewProps} from "@/utils/types/types";
import {genderType} from "@/utils/lib/genderType";

const ApplicantView: FC<ApplicantViewProps> = ({applicant}) => {
    return (
        <div className='tw-max-w-full'>
            <h1 className='tw-text-xl tw-font-bold tw-mb-5'>{applicant.name + " " + applicant.surname}</h1>
            <div className='tw-flex tw-flex-col tw-gap-y-1'>
                <OrderView icon='pi-globe' value={applicant.passport_no}/>
                <OrderView icon='pi-calendar' value={applicant.date_of_birth}/>
                <OrderView icon='pi-calendar-times' value={applicant.date_expiry}/>
                <OrderView icon='pi-flag' value={applicant.nationality}/>
                <OrderView icon='pi-sort-alpha-up' value={applicant.name}/>
                <OrderView icon='pi-sort-alpha-down' value={applicant.surname}/>
                <OrderView icon='pi-user' value={genderType(applicant.gender)!}/>
                <OrderView icon='pi-phone' value={applicant.phone_number}/>
            </div>
        </div>
    );
};

export default ApplicantView;