/**
 * @description 存储配置
 * @author wb
 */
const { isProd } = require('../utils/env');
const host = '118.31.6.201';

let REDIS_CONF = {
    port: 6379,
    host,
    password: { auth_pass: 'redis' }
}

let MYSQL_CONF = {
    host,
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
        host
    }

    MYSQL_CONF = {
        host,
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
