const fs = require('fs');
const path = require("path");
function addControllers(router, dir) {
    let files = fs.readdirSync(path.join(__dirname, dir));
    let js_files = files.filter((file) => {
        return file.endsWith('.js')
    })
    for (let f of js_files) {
        let mapping = require(path.join(__dirname, dir, f));
        console.log(mapping)
        addMapping(router, mapping)
    }
}

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
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

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';
    router = require('koa-router')();
    addControllers(router, controllers_dir)
    return router.routes();
}