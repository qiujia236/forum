/**
 * @description 微博 view 路由
 */
const router = require('koa-router')();
const { getProfileBlogList } = require('../../controller/blog-profile');
const { loginRedirect } = require('../../middleWares/loginChecks');

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {

    })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    console.log(result);
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
        }
    })
})

module.exports = router;