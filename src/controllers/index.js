var fn_index = async (ctx, next) => {
    ctx.response.body = `
        <form action="/signin" method="post">
            <p>name: <input name="name" value="koa"></p>
            <p>password: <input type="password" name="password"></p>
            <p><input type="submit" value="submit"></p>
        </form>
    `
}
var fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(name)
    console.log(password)
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>welcom ${name}</h1>`
    } else {
        ctx.response.body = `<h1>Login failed</h1>` +
            `<p><a href="/">try again</a></p>`;
    }
};
module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}