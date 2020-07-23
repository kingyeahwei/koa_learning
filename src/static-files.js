const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            console.log(fp)
            if (await fs.exists(fp)) {
                console.log(1111)
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } else {
                console.log(222)
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;