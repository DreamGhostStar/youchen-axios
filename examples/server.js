const express = require('express');
const webpack = require('webpack');
var bodyParser = require('body-parser');
// webpack-dev-middleware 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
// 使用webpack将webpack配置文件编译，等同于打包代码
const compiler = webpack(config);

const app = express();
const router = express.Router()
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
// app.use(express.static(config.output.path))
app.use(express.static(__dirname))

// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// 路由监听
router.get('/simple/get', function (req, res) {
    res.json({
        msg: `hello world`
    })
})

router.get('/base/get', function (req, res) {
    res.json(req.query)
})

router.post('/base/post', function (req, res) {
    res.json(req.body)
})

router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', (chunk) => {
        if (chunk) {
            msg.push(chunk)
        }
    })
    req.on('end', () => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
    })
})

app.use(router)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});