// index:
const model = require('../model');

let user = model.users
module.exports = {
    'GET /': async (ctx, next) => {
        var b = {
            'code': 200,
            'message': '',
            'status': 0,
            'data': {}
        }
        var peoples = await user.findAll({
            limit: 10,
            offset: 0,
        });
        var COUNT = await user.count()
        b.data.list = peoples
        b.data.total = COUNT
        ctx.response.body = b;
    }
};
