// sign in:
const model = require('../model');

let User = model.users;

var login = async (ctx, next) => {
  var b = {
    'code': 200,
    'message': 'success',
    'status': 0,
    'data': []
  }
  var
    name = ctx.request.body.name || '',
    passwd = ctx.request.body.passwd || '';
  console.log(`name: ${name} passwd:${passwd}`);
  const Users = await User.findOne({
    where: {
      username: name
    }
  })
  console.log(`name: ${name} passwd:${passwd}`);
  const userId = Users.name;
  console.log(`find ${userId}`);

  if (!!Users) {
    console.log('密码正确');
    b.data = Users
    ctx.body = b;
  } else {
    console.log('密码错误');
    b.message = "密码错误";
    b.status = -1
    b.data = {};
    ctx.body = b;
  }


}
module.exports = {
  'POST /login': login
};
