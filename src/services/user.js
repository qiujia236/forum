/**
 * @description user service
 */
const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        whereOpt.password = password;
    }

    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result === null) {
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues);
    return formatRes;
}

/**
 * 创建用户
 * @param {string}  用户名
 * @param {string}  密码
 * @param {number}  性别
 * @param {string}  昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues;
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    console.log(result);
    // result 删除的行数
    return result > 0
}

module.exports = { getUserInfo, createUser, deleteUser }