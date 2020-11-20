const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
    },
    nickName: {
        type: STRING,
        allowNull: true,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        comment: '性别（1男性，2女性，3保密）'
    },
    picture: {
        type: STRING,
        comment: '头像，图片地址'
    },
    city: {
        type: STRING,
        comment: '城市地址'
    }
});

module.exports = User;