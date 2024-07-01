const redis = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({
    url: redisUrl
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

/**
 * cache information based on key using REDIS, duration in seconds
 * @param {*} duration 
 * @returns 
 */
module.exports = (duration) => (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    client.get(key, (err, reply) => {
        if (reply) {
            res.send(reply);
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                client.set(key, body, 'EX', duration);
                res.sendResponse(body);
            };
            next();
        }
    });
};
