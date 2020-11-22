/**
 * @description 个人主页 API 路由
 */

const { getProfileBlogList } = require('../../controller/blog-profile');
const { loginCheck } = require('../../middleWares/loginChecks');
const { getBlogListStr } = require('../../utils/blog');
const router = require('koa-router')()

router.prefix('/api/profile');

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)
    // 渲染为 html 字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router;