const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isTest, isProd } = require('../utils/env');

const { host, user, password, database, dialect } = MYSQL_CONF;

const conf = {
    host,
    dialect
}

if (isProd) {
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000
    }
}

if (isTest) {
    conf.logging = () => { }
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;