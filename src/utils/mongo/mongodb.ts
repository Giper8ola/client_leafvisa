import mongoose, {Schema} from "mongoose";

const connectMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb://bls-orders-access:7ZLGylIwKbiudfVn0Z1@89.108.127.221:27017/blsbot", {
            family: 6,
        });

    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;