import type {CreateOrderForm} from "@/utils/types/types";
import {generateString} from "@/utils/lib/generateString";
import {OrderI} from "@/utils/types/interfaces";

export const generateDefaultBody = (data: CreateOrderForm): OrderI => {
    return  {
        order_id: 'SP-' + generateString(5),
        status: 'na:awaiting_details',
        amount_of_applicants: +data.amount_of_applicants,
        applicant_details: null,
        payment: 4000,
        city_names: data.city_names,
        visa_subcats: data.visa_subcats,
        country: "spain",
        date_limits: [],
        misc: {
            can_register_until: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()
        },
        password: null,
        priority: 0,
        type_of_customer: "v1.0"
    }
}