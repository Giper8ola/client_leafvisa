import connectMongoDB from "@/utils/mongo/mongodb";
import mongoose from "mongoose";
import {OrderI} from "@/utils/types/interfaces";

export const getOrderById = async (id: string) => {
    await connectMongoDB();
    const collection = await mongoose.connection.db.collection('orders_temp')

    const order = await collection.findOne({order_id: id})

    if(!order) return order

    return {
        order_id: order?.order_id,
        status: order?.status,
        amount_of_applicants: order?.amount_of_applicants,
        applicant_details: order?.applicant_details,
        payment: order?.payment,
        city_names: order?.city_names,
        visa_subcats: order?.visa_subcats,
        country: order?.country,
        date_limits: order?.date_limits,
        misc: order?.misc
    } as OrderI
}