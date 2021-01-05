// sign in:
const model = require('../model');

let people = model.people;
var queryFromSomewhere = async (animals,pageNo) => {
    if (animals != '') {
        var peoples,COUNT;
        await people.findAndCountAll({
            order: [['id', 'DESC']],
            where: {
                name: {
                    $like:'%'+animals+'%'
                },
            },
            limit:10,
            offset:pageNo,


        }).then(function (result){
            peoples =result.rows;
            COUNT = result.count;
        });
    } else {
        var peoples = await people.findAll({
            order: [['id', 'DESC']],
            limit:10,
            offset:pageNo,
        });
        var COUNT = await people.count()
    }
    console.log(`find ${peoples.length} peoples:`);
    for (let p of peoples) {
        console.log(JSON.stringify(p));
    }
    return [peoples,COUNT];
};


module.exports = {
    'POST /getList': async (ctx, next) => {
        var b = {
            'code': 200,
            'message': 'success',
            'status': 0,
            'data': {}
        };
        var name = ctx.request.body.name || '';
        var pageNo = (ctx.request.body.pageNo-1)*10;

        var peoples = await queryFromSomewhere(name,pageNo);
        b.data.list = peoples[0];
        b.data.total = peoples[1];
        ctx.response.body = b;
    }
};
