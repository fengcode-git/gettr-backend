import express from "express";
import logger from "./utils/logger";
import path from "path";
import morgan from 'morgan'
import config from "./utils/config";
import home from "./routes/home"
import account from "./routes/api/account"
import file from "./routes/api/file";
import post from './routes/api/post'

const app = express()

// 配置视图
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')))

// 中间件
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', home)
app.use('/api/account', account)
app.use('/api/file', file)
app.use('/api/post', post)

//启动监听
app.listen(config.server.port, () => {
    const { hostname, port } = config.server
    logger.info(`服务器正在监听 http://${hostname}:${port}`)
});
