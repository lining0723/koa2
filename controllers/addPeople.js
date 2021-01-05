// sign in:
const model = require('../model');

let people = model.people;

module.exports = {
  'POST /addPeople': async (ctx, next) => {
    var b = {
      'code': 200,
      'message': '',
      'data': []
    }
    var
      name = ctx.request.body.name,
      age = ctx.request.body.age || '';
    if(!name){
      b.message = "昵称不能为空";
      b.code = 202;
      b.data = {};
    }else{
      await people.findOrCreate({
        where: {
          name: name
        },
        defaults: {
          age: age,
          createTime: new Date().getTime(),
          creatorName: "aaaa"
        }
      })
        .spread(function (user, created) {
          console.log(created)
          if (created) {
            b.message = "success";
          } else {
            b.message = "小编名称已存在";
            b.code = 202;
            b.data = {};
          }
        })
    }
    ctx.response.body = b;

  }
};
