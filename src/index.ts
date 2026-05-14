
import http from 'http'
import dotenv from 'dotenv';
import app from './expressApp.js';
import { connectMongoDB } from './infrastructure/database/mongo/mongoConnection.js';
import { connectRedis } from './infrastructure/database/redis/redisConnection.js';
dotenv.config()




const PORT=process.env.PORT || 5000;

async function startServer() {
    try {

        await connectMongoDB();
        await connectRedis();
        const server=http.createServer(app);

        server.listen(PORT, ()=>{
            console.log(`Server running at port ${PORT}`)
        })

    } catch  {
        console.error("Server startup failed");
        process.exit(1)
    }
}

startServer()
