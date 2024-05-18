import mongoose, {Model, Schema} from "mongoose";
import {OrderI} from "@/utils/types/interfaces";

const orderSchema = new Schema<OrderI, Model<OrderI>>({
    order_id: String,
    status: String,
    amount_of_applicants: Number,
    applicant_details: [{
        nationality: String,
        name: String,
        surname: String,
        date_of_birth: String,
        passport_no: String,
        date_issued: String,
        date_expiry: String,
        issued_by: String,
        phone_number: String,
        email: String,
        gender: String
    }],
    payment: Number,
    city_names: [String],
    visa_subcats: [String],
    country: String,
    date_limits: [String],
    misc: Object,
    password: String,
    priority: Number,
    type_of_customer: String
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order