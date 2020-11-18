const seq = require('./seq');
// require('./model');

seq.authenticate().then(() => {
    console.log('mysql ok');
}, () => {
    console.log('err');
});

// 执行同步数据库
seq.sync({ force: true }).then(() => {
    console.log('ok');
    process.exit();
});
