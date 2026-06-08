
import http from 'http'
import dotenv from 'dotenv';
import app from './expressApp';
import { connectMongoDB } from './infrastructure/database/mongo/mongoConnection';
import { connectRedis } from './infrastructure/database/redis/redisConnection';
import { env } from './config/env';
dotenv.config()




const PORT=env.PORT || 5000;

async function startServer() {
    try {
        console.log(PORT);
        

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
