import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from "@/utils/mongo/mongodb";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB();
    const collection = await mongoose.connection.db.collection('orders_temp')
    const { id } = req.query
    switch (req.method) {
        case 'GET': {
            try {
                const order = await collection.findOne({order_id: id})

                if(!order)
                    return res.json({
                        bad: true
                    })

                res.json({
                    status: order?.status,
                    order_id: order?.order_id
                })
            }
            catch (e) {
                res.status(404).json({error: "err"});
            }
            break
        }
        case 'PUT': {
            try {
                const result = await collection.updateOne({order_id: id}, {
                    $set: req.body
                })

                res.status(200).send("updated")
            }catch (e) {
                res.status(404).json({error: "err"});
            }
        }
    }
}