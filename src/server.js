const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const isProduction =  process.env.NODE_ENV === 'production';
const templating =  require('./templating');
let staticFiles = require('./static-files');
// 记录访问时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
})
app.use(staticFiles('/static/', require('path').resolve(__dirname, '../static')))
app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))
const controller = require('./controller');
app.use(controller('./controllers'))
app.listen(3000)
console.log("app listening on port 3000")