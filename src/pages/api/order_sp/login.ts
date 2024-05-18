import connectMongoDB from "@/utils/mongo/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB();
    switch (req.method) {
        case 'POST': {
            try {
                const collection = await mongoose.connection.db.collection('orders_temp')
                const order = await collection.findOne({order_id:  req.body.id})

                if (!order) {
                    return res.status(400).json({ error: 'Order not found' });
                }

                if (!bcrypt.compareSync(req.body.password, order.password)) {
                    return res.status(400).json({ error: 'Invalid password' });
                }

                const token = jwt.sign({ id: req.body.id }, "SOOOO_SECRET_KEY", { expiresIn: '1d' });

                res.setHeader('Set-Cookie', cookie.serialize('auth', `Bearer ${token}`, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 86400,
                    path: '/order_sp',
                }));

                res.status(200).json({ token });
            }
            catch (e) {
                res.status(404).json({error: "Invalid :)"});
            }
        }
    }
}