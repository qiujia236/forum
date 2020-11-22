/**
 * @description 用户关系 controller
 */
const { SuccessModel } = require("../model/ResModel");
const { getUserByFollower } = require("../services/user-relation")

/**
* 根据 userId 获取粉丝列表
* @param {number} userId 用户 id
*/
async function getFans(userId) {
    const { count, userList } = await getUserByFollower(userId);

    // 返回
    return new SuccessModel({ count, fansList: userList })
}

module.exports = { getFans }