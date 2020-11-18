const { Blog, User } = require('./model');

!(async function () {
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    });
    const zhangsanId = zhangsan.dataValues.id;

    const lisi = await User.create({
        userName: 'lisi',
        password: '123',
        nickName: 'lisi'
    });
    const lisiId = lisi.dataValues.id;

    const lisi1 = await User.create({
        userName: 'lisi',
        password: '123',
        nickName: 'lisi'
    });
    const lisiId1 = lisi1.dataValues.id;
})()