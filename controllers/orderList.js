// sign in:
const model = require('../model');
const sequelize = require('sequelize');
let order = model.order;
let user = model.sys_user;

order.belongsTo(user,{foreignKey:'operate_person'})
module.exports = {
  'POST /getOrder': async (ctx, next) => {
    var name = ctx.request.body.name || '';
    // var pageNo = (ctx.request.body.page.pageNo-1)*10;
    var list,COUNT;
    await order.findAndCountAll({
      attributes: {include: [sequelize.col('sys_user.user_name')]},
      include: [{ // include关键字表示关联查询
        model: user, // 指定关联的model
        // as:"operate_personName",
        attributes: [], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
        where: name?{
          user_name: {
            $like: '%'+name+'%'
          },
        }:{},
      }],
      raw:true,
      limit:10,
      offset:0,
    }).then(function (result){
      list =result.rows;
      COUNT = result.count;
    });
    var b = {
      code: 200,
      message: 'success',
      status: 200,
      data: {},
      page:{}
    };

    b.data = list;
    b.page.total = COUNT;
    ctx.response.body = b;
  }
};
