const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(async (ctx, next) => {
    console.log(`Progress ${ctx.request.method} ${ctx.request.url}`)
    await next()
})
app.use(bodyParser());
const controller = require('./controller');
app.use(controller('./controllers'))
app.listen(3000)
console.log("app listening on port 3000")