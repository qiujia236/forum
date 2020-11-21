/**
 * @description user controller
 */
const { registerUserNameNotExistInfo, registerFailInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { getUserInfo, createUser } = require("../services/user");
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

module.exports = { isExist, register }