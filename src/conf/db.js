/**
 * @description 存储配置
 * @author wb
 */
const { isProd } = require('../utils/env');

let REDIS_CONF = {
    port: 6379,
    host: '47.110.51.250',
    password: { auth_pass: 'redis' }
}

let MYSQL_CONF = {
    host: '47.110.51.250',
    user: 'root',
    password: 'root',
    port: '3306',
    dialect: 'mysql',
    database: 'forum'
}

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: '47.110.51.250'
    }

    MYSQL_CONF = {
        host: '47.110.51.250',
        user: 'root',
        password: 'root',
        port: '3306',
        dialect: 'mysql',
        database: 'forum'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
