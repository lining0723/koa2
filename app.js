const Koa = require('koa');

const bodyParser = require('koa-bodyparser');   //post请求获取body

const controller = require('./controller');   //路由整合

const cors = require('koa-cors');   //引入跨域解决

const app = new Koa();


app.use(cors());   //跨域解决插件

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    // ctx.response.set('X-Response-Time', `${execTime}ms`);
    // ctx.response.set('Access-Control-Allow-Credentials', true);
});


app.use(bodyParser());  //处理post请求

app.use(controller());   //url路由

app.listen(3000);
console.log('localhost:3000');
