// sign in:
const model = require('../model');

let error = model.error;

module.exports = {
  'POST /error': async (ctx, next) => {
    var b = {
      'code': 200,
      'message': '',
      'data': []
    };
    var body = ctx.request.body;
    var now = Date.now();
    await error.create({
      id: 'error-' + now,
      key: body.key,
      networkType: body.networkType,
      notifierVersion: body.notifierVersion,
      latitude: body.locationInfo.latitude,
      longitude: body.locationInfo.longitude,
      locationInfoErrMsg: body.locationInfo.errMsg,
    }).then((e) => {
      console.log(e)
    })
    b.message = "success";
    ctx.response.body = b;

  }
};
