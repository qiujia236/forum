/**
 * @description 时间相关的工具函数
 */

const { format } = require('date-fns');

/**
 * 格式化时间，如 09.05 23:02
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
    let formatStr = format(new Date(str), 'MM.dd HH:mm')
    return formatStr;
}

module.exports = {
    timeFormat
}