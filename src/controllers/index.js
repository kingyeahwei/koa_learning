// var fn_index = async (ctx, next) => {
//     ctx.response.body = `
//         <form action="/signin" method="post">
//             <p>name: <input name="name" value="koa"></p>
//             <p>password: <input type="password" name="password"></p>
//             <p><input type="submit" value="submit"></p>
//         </form>
//     `
// }
// var fn_signin = async (ctx, next) => {
//     let name = ctx.request.body.name || '';
//     let password = ctx.request.body.password || '';
//     console.log(name)
//     console.log(password)
//     if (name === 'koa' && password === '12345') {
//         ctx.response.body = `<h1>welcom ${name}</h1>`
//     } else {
//         ctx.response.body = `<h1>Login failed</h1>` +
//             `<p><a href="/">try again</a></p>`;
//     }
// };

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'welcome'
    })
}

var fn_signin = async (ctx, next) => {
    let email = ctx.request.body.email || '';
    let password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        ctx.render('singin-ok.html', {
            title: 'sign in ok',
            name: 'mr node'
        })
    } else {
        ctx.render('sign-failed.html', {
            title: 'sign in failed!'
        })
    }
}
module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}