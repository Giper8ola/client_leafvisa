import connectMongoDB from "@/utils/mongo/mongodb";
import {NextApiResponse} from "next";
import bcrypt from "bcrypt";
import {CustomRequest} from "@/utils/types/types";
import mongoose from "mongoose";


export default async function handler(req: CustomRequest, res: NextApiResponse) {
    await connectMongoDB();
    switch (req.method) {
        case 'POST': {
            try {
                const collection = await mongoose.connection.db.collection('orders_temp')

                const {password, details, dates, foundUs, id} = req.body

                const hash = bcrypt.hashSync(password, 5)


                const result = await collection.updateOne({order_id: id}, {
                    $set: {
                        password: hash,
                        applicant_details: details,
                        date_limits: dates,
                        misc: {
                            found_about_as_via: foundUs
                        },
                        status: 'a:processing'
                    }
                });

                res.status(200).json({result});
            }
            catch (e) {
                res.status(404).json({error: "error"});
            }
        }
    }
}