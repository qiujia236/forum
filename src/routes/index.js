const { loginRedirect, loginCheck } = require('../middlewares/loginChecks');

const router = require('koa-router')();

router.get('/', loginRedirect, async (ctx, next) => {
  ctx.body = '<h1>koa2 json</h1>'
});

router.get('/json', loginCheck, async (ctx, next) => {
  const session = ctx.session;

  if (!session.vieNum) {
    session.vieNum = 0;
  }

  session.vieNum++;
  ctx.body = {
    title: 'koa2 json',
    vieNum: session.vieNum
  }
});

router.get('/profile/:userName', async (ctx, next) => {
  ctx.body = {
    title: 'this is profile page',
    userName,
  }
});

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: 'this is loadMore page',
    userName,
    pageIndex
  }
});

module.exports = router;