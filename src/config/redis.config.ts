import IORedis, { Redis } from 'ioredis';
import Redlock from 'redlock';

//export const redisClient = new IORedis(process.env.REDIS_SERVER_URL || 'redis://localhost:6379');

function connectToRedis() {
  try {
    let connection:Redis;
    
    return () =>{
        if(!connection){
            connection = new IORedis(process.env.REDIS_SERVER_URL || 'redis://localhost:6379');;
            return connection;
        }
        return connection;
    }

    
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
}
// Singleton pattern to ensure a single Redis connection instance
// throughout the application lifecycle
// when we call getRedisConnectionObject it will return the connectToRedis function
// then we call that function it will return the Redis connection instance
// if the connection instance is not created it will create one and return it
// if the connection instance is already created it will return the existing one
export const getRedisConnectionObject = connectToRedis();


export const redlock = new Redlock(
    // You should have one client for each independent redis node
    // or cluster
    [getRedisConnectionObject()],
    {
        // the expected clock drift; for more details
        // see http://redis.io/topics/distlock
        driftFactor: 0.01, // time in ms
    
        // the max number of times Redlock will attempt
        // to lock a resource before erroring
        retryCount:  10,
    
        // the time in ms between attempts
        retryDelay:  200, // time in ms
    
        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter:  200 // time in ms
    }
)