/**
 * @description user controller
 */
const { registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { getUserInfo, createUser, deleteUser } = require("../services/user");
const doCrypto = require("../utils/cryp");

/**
 * 用户名是否存在
 * 业务逻辑处理，调用services获取数据，统一返回格式
 * @param {string} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new SuccessModel({ userInfo });
    } else {
        return new ErrorModel(registerUserNameNotExistInfo);
    }
}

/**
 * register
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 性别（1男，2 女，3 保密）
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new ErrorModel(registerUserNameNotExistInfo);
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        });
        return new SuccessModel();
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo);
    }
}

/**
 *  登陆
 * @param {object} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
    password = doCrypto(password);
    const userInfo = await getUserInfo(userName, password);
    // 登录失败
    if (!userInfo) {
        return new ErrorModel(loginFailInfo);
    }
    // 登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = { isExist, register, login, deleteCurUser }