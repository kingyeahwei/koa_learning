const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const router = require('koa-router')();
app.use(async (ctx, next) => {
    console.log(`Progress ${ctx.request.method} ${ctx.request.url}`)
    await next()
})
app.use(bodyParser());

var files = fs.readdirSync(__dirname + "/controllers");
var js_files = files.filter((f) => {
    return f.endsWith('.js');
})

for (let f of js_files) {
    let mapping = require(__dirname + '/controllers/' + f);
    console.dir(mapping)
    for (let url in mapping) {
        if (url.startsWith("GET ")) {
            let path = url.substring(4);
            router.get(path, mapping[url])
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url])
        } else {
            console.log(`invalid URL ${url}`)
        }
    }
}


app.use(router.routes())
app.listen(3000)
console.log("app listening on port 3000")