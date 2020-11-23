/**
 * @description 首页 controller
 */
const xss = require('xss');
const { PAGE_SIZE } = require('../conf/constant');
const { createBlogFailInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlog, getFollowersBlogList } = require("../services/blog")

/**
* 创建论坛
* @param {Object} param0 创建论坛所需的数据 { userId, content, image }
*/
async function create({ userId, content, image }) {
    try {
        // 创建论坛
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        });
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