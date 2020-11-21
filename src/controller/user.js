/**
 * @description user controller
 */
const { registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo } = require("../model/ErrorInfo");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { getUserInfo, createUser, deleteUser, updateUser } = require("../services/user");
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

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    );
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {object} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}