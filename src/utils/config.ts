import dotenv from "dotenv";

dotenv.config()

const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1'
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || ''
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || ''
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'http://127.0.0.1'
const SERVER_PORT = process.env.SERVER_PORT || 2000
const APP_KEY = process.env.APP_KEY || 'ABCDE'

const config = {
    mysql: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE
    },
    server: {
        hostname: SERVER_HOSTNAME,
        port: SERVER_PORT
    },
    app: {
        key: APP_KEY
    }
}

export default config