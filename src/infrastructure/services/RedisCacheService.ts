import type { ICacheService } from "../../domain/interfaces/ICacheService.js";
import { getRedisClient } from "../database/redis/redisConnection.js";


export class RedisCacheService implements ICacheService{
    
    async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {

        await getRedisClient().set(key,JSON.stringify(value),{
            EX:ttlSeconds
        })

    }


    async get<T>(key: string): Promise<T | null> {

        const data=await getRedisClient().get(key);
        if(!data){
            console.log("Requested cached data doesnot exist");
            return null
        }
        return JSON.parse(data) as T

    }


    async delete(key: string): Promise<void> {

        await getRedisClient().del(key)

    }


};