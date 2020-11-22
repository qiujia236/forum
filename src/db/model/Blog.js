/**
 * @description 论坛数据模型
 */
const seq = require('../seq');
const { STRING, INTEGER, TEXT } = require('../types');

const User = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        allowNull: true,
        comment: '图片地址'
    },
});

module.exports = User;