/**
 * @description 用户关系 controller
 */
const { addFollowerFailInfo, deleteFollowerFailInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { getUserByFollower, addFollower, deleteFollower, getFollowersByUser } = require("../services/user-relation")

/**
* 根据 userId 获取粉丝列表
* @param {number} userId 用户 id
*/
async function getFans(userId) {
    const { count, userList } = await getUserByFollower(userId);
    return new SuccessModel({ count, fansList: userList })
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowers(userId) {
    const { count, userList } = await getFollowersByUser(userId)

    return new SuccessModel({
        count,
        followersList: userList
    })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.stack, ex.message)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = { getFans, getFollowers, follow, unFollow }