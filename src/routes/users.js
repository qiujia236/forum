const router = require('koa-router')();

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

router.get('/login', function (ctx, next) {
  const { userName, password } = ctx.request.body;
  ctx.body = {
    userName,
    password
  }
});

module.exports = router;
