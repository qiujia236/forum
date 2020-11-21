const path = require('path')
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const { REDIS_CONF } = require('./conf/db');

const errorViewRouter = require('./routes/view/error');
const userViewRouter = require('./routes/view/user');
const userAPIRouter = require('./routes/api/user');
const utilsAPIRouter = require('./routes/api/utils');
const index = require('./routes/index');
const { isProd } = require('./utils/env');

// error handler，页面显示
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// 中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(path.join(__dirname, '..', 'uploadFiles')));
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

let options = {
  host: REDIS_CONF.host,
  port: REDIS_CONF.port,
  auth_pass: REDIS_CONF.password.auth_pass,
  db: 0
}
app.keys = ['UISDF_7878#'];
app.use(session({
  key: 'forum:sid',
  prefix: 'forum:sess',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore(options)
  // store: redisStore({
  //   all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  // })
}));

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods());
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
