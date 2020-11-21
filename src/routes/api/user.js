/**
 * user API路由
 */
const router = require('koa-router')();
const { isExist, register, login } = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middleWares/validator');

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

module.exports = router;