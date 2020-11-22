/**
 * @description 微博 view 路由
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {

    })
    // ctx.body = 'hello'
})

module.exports = router;