const Sequelize = require('sequelize');

// 会创建users表
const seq = require('./seq');

const User = seq.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

Blog.belongsTo(User, {
    foreignKey: 'userId',
});

User.hasMany(Blog, {
    foreignKey: 'userId',
})

module.exports = { User, Blog };