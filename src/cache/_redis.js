/**
 * @description 连接redis方法
 * @author wb
 */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const { port, host, password } = REDIS_CONF;
const redisClient = redis.createClient(port, host, password);

redisClient.on('error', (err) => {
    console.error('redis error', err);
    process.exit();
});
redisClient.on('success', (success) => {
    console.error('redis success', success);
});

/**
 * 
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 超时时间
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}