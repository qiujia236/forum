/**
 * user API路由
 */
const router = require('koa-router')();
const { isExist, register, login, deleteCurUser } = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middleWares/validator');
const { loginCheck } = require('../../middlewares/loginChecks');

router.prefix('/api/user');

// 注册路由
router.post('/register', genValidator(userValidate),
    async (ctx, next) => {
        const { userName, password, gender } = ctx.request.body;
        // 调用controller方法
        let result = register({ userName, password, gender });
        ctx.body = result
    })

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
})

// login
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        // 测试环境下，测试账号登录之后，删除自己
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router;