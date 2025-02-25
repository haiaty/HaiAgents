

const redis = require("redis");

//===========================
// Redis connection string
//===========================
//const redisConnectionString =  `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`;
const redisConnectionString =  `redis://127.0.0.1:6379`;


module.exports =  redis.createClient(redisConnectionString);