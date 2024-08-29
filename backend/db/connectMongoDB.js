import mongoose from 'mongoose';

const connectMongoDB = async (req, res) => {

    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`${error.message}`);
        process.exit(1);
    }

};


export default connectMongoDB;