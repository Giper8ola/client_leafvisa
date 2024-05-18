import {Nullable} from "primereact/ts-helpers";
import {NextApiRequest} from "next";
import {ReactNode} from "react";
import {OrderStatusEnums} from "@/utils/types/enums";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type ApplicantDetail = {
    nationality: string,
    name: string,
    surname: string,
    date_of_birth: Nullable<Date>,
    passport_no: string,
    date_issued: Nullable<Date>,
    date_expiry: Nullable<Date>,
    issued_by: string,
    phone_number: string,
    email: string,
    gender: string
}

export type DateStringApplicantDetail = Override<ApplicantDetail, {
    date_of_birth: string,
    date_issued: string,
    date_expiry: string
}>

export type CreateOrderForm = {
    city_names: [string];
    visa_subcats: [string];
    amount_of_applicants: number
}

export type ApplicationBlockProps = {
    defaultState: boolean;
    applicants: DateStringApplicantDetail[] | null;
    amount: number;
}

export type ApplicantViewProps = {
    applicant: DateStringApplicantDetail
}

export type OrderInputProps = {
    children: ReactNode;
    value: string;
}

export type OrderStatusProps = {
    status: `${OrderStatusEnums}`
}

export type OrderViewProps = {
    icon: string,
    value: string
}

export type RecordCalendarProps = {
    dates?: string[] | null,
    updateData?: {
        isUpdate: boolean,
        recordId: string
    }
}

export type RegRequestBody = {
    id: string,
    password: string,
    details: ApplicantDetail,
    dates: string[],
    foundUs: string
}

export type CustomRequest = Override<NextApiRequest, { body: RegRequestBody }>