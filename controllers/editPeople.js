// sign in:
const model = require('../model');

let people = model.people;
var queryFromSomewhere = async (animals) => {
    var peoples = await people.findAll({
        where: {
            id: animals
        },

    });
    console.log(`find ${peoples.length} peoples:`);
    for (let p of peoples) {
        console.log(JSON.stringify(p));
    }
    return peoples;
};
module.exports = {
    'POST /editPeople': async (ctx, next) => {
        var b = {
            'code': 200,
            'message': '',
            'data': []
        }
        var id = ctx.request.body.id,
            name = ctx.request.body.name,
            age = ctx.request.body.age;
        var peoples = await queryFromSomewhere(id);

        if (peoples.length != 0&&name!='') {
            for (let p of peoples) {
                p.name = name;
                p.age = age;
                await p.save();
            }
            b.message = "success";
        } else {
            b.message = "该记录不存在";
            b.code = 202;
            b.data = {};
        }
        ctx.response.body = b;

    }
};
