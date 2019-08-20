import express from 'express'
import path from 'path'
import router from './router'
import bodyParser from 'body-parser'
import config from 'config-lite' // 配置中间件
import history from 'connect-history-api-fallback'
import chalk from 'chalk'
import mqttServer from './mqtt/server' // mqtt服务端
import redis from './redis'

mqttServer()
const app = express()
app.disable('etag') // 禁止304缓存
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || req.headers.referer || '*')
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Credentials", true) // 可以带cookies
  res.header("Access-Control-Max-Age", -1) // 禁止缓存
	res.header("X-Powered-By", 'Express')
	if (req.method === 'OPTIONS') {
	  res.sendStatus(200)
	} else {
	  next()
	}
})

// const server = http.createServer(app)
// const io = require('socket.io')(server)
// new SocketServer(io)

// 解析body参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
router(app)
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))
app.listen(config.port || '1313', () => {
  console.log(
		chalk.green(`成功监听端口${config.port || 1313}`)
	)
})
