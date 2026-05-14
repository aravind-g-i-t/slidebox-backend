import { createClient,type RedisClientType } from "redis";

let redisClient: RedisClientType;

export async function connectRedis(): Promise<void> {
    try {
        redisClient = createClient({
            url: process.env.REDIS_URL!,
            socket: { tls: false },
        }) as RedisClientType;

        redisClient.on("connect", () => {
            console.log("Connected to Redis");
        });

        redisClient.on("error", (err) => {
            console.log(`Redis error: ${err.message}`);
        });

        await redisClient.connect();
    } catch (err: any) {
        console.log(`Failed to connect to Redis: ${err.message}`);

    }
}

export function getRedisClient(): RedisClientType {
    if (!redisClient) throw new Error("Redis not connected");
    return redisClient;
}
