/**
 * @description 首页 test
 */

const server = require("../server")
let COOKIE = null;
// 登录
test('登陆成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName: 'admin',
            password: 'admin'
        });
    expect(res.body.errno).toBe(0)

    // 获取 cookie
    COOKIE = res.headers['set-cookie'].join(';')
})

// 存储微博 id
let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})