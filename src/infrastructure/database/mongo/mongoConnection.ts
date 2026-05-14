import mongoose from 'mongoose';

export const connectMongoDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI || '';
        
        if (!uri) {
            console.log("Missing MONGODB_URI in .env");
            process.exit(1);
        }

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to DB");
        });
        
        mongoose.connection.on("error", (error) => {
            console.log(` Mongoose connection error: ${error}`);
        });
        await mongoose.connect(uri);

    } catch (error) {
        console.log(`Mongo connection error: ${error}`);
        process.exit(1);
    }
};
