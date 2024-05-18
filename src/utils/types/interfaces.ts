import {ApplicantDetail, DateStringApplicantDetail} from "@/utils/types/types";

export interface OrderI {
    order_id: string,
    status: string,
    amount_of_applicants: number,
    applicant_details: DateStringApplicantDetail[] | ApplicantDetail[] | null,
    payment: number,
    city_names: string[],
    visa_subcats: string[],
    country: string,
    date_limits: string[],
    misc: Record<string, string>,
    password: null | string,
    priority: number,
    type_of_customer: string
}