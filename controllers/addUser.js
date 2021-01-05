// sign in:
const model = require('../model');

let user = model.users

module.exports = {
  'POST /addUser': async (ctx, next) => {
    var b = {
      'code': 200,
      'message': '',
      'status': 0,
      'data': []
    }
    var
      name = ctx.request.body.name,
      passwd = ctx.request.body.passwd || '';
    if (!!name) {
      var users = await user.findOrCreate({
        where: {
          name
        },
        defaults: {
          passwd: passwd,
          username: name,
          avatar: "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png"
        }
      }).spread(function (user, created) {
        console.log('是否已存在 ' + !created)
        console.log(user.get({
          plain: true
        }))
        if (created) {
          b.message = "注册成功";

        } else {
          b.message = "用户名已存在";
          b.status = -1;
          b.data = {};
        }

      })

    } else {
      b.message = "用户名不能为空!";
      b.status = -1;
      b.data = {};
    }
    ctx.body = b;

  }
};
