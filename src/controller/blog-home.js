/**
 * @description 首页 controller
 */
const xss = require('xss');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant');
const { createBlogFailInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlog, getFollowersBlogList } = require("../services/blog")
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation');

/**
* 创建论坛
* @param {Object} param0 创建论坛所需的数据 { userId, content, image }
*/
async function create({ userId, content, image }) {
    const atUserNameList = [];
    content = content.replace(REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName);
            return matchStr;
        })

    // 根据 @ 用户名查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    // 根据用户信息，获取用户 id
    const atUserIdList = atUserList.map(user => user.id)

    try {
        // 创建论坛
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        });

        // 创建 @ 关系
        await Promise.all(atUserIdList.map(
            userId => createAtRelation(blog.id, userId)
        ))

        // 返回
        return new SuccessModel(blog);
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取首页列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { count, blogList } = result;

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = { create, getHomeBlogList }