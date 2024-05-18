import connectMongoDB from "@/utils/mongo/mongodb";
import {NextApiResponse} from "next";
import type {CustomRequest} from "@/utils/types/types";
import mongoose from "mongoose";

export default async function handler(req: CustomRequest, res: NextApiResponse) {
    await connectMongoDB();
    switch (req.method) {
        case 'POST': {
            try {
                const collection = await mongoose.connection.db.collection('orders_temp')
                const result = await collection.insertOne(req.body)
                res.status(200).json({result});
            }
            catch (e) {
                res.status(404).json({error: 'error'});
            }
        }
    }
}