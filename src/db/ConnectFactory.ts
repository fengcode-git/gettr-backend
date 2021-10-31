import config from '../utils/config'
import mysql from 'mysql'
class ConnectFactory{
    static create(){
        return mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database
        })
    }
}

export default ConnectFactory