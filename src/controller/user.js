/**
 * @description user controller
 */

const { registerUserNameNotExistInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { getUserInfo } = require("../services/user");

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

module.exports = { isExist }