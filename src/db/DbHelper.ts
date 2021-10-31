import mysql from 'mysql'
import ConnectFactory from './ConnectFactory'

class DbHelper {
    private conn: mysql.Connection
    constructor(conn: mysql.Connection) {
        this.conn = conn
    }

    static create() {
        let conn = ConnectFactory.create()
        return new DbHelper(conn)
    }

    async open() {
        return new Promise((resolve, reject) => {
            this.conn.connect(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }

    async close() {
        return new Promise((resolve, reject) => {
            this.conn.end(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }

    async beginTransaction() {
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }

    async commit() {
        return new Promise((resolve, reject) => {
            this.conn.commit(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }
    async rollback() {
        return new Promise((resolve, reject) => {
            this.conn.rollback(() => {
                resolve(null)
            })
        })
    }
    async query<T>(sql: string, args: Array<any> = []): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, function (err, results, fields) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }

    async execute(sql: string, args: Array<any> = []): Promise<number> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }

    async single<T>(sql: string, args: Array<any> = []): Promise<T | null> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    if (results == null || results.length == 0) {
                        resolve(null)
                    } else {
                        resolve(results[0])
                    }
                }
            })
        })
    }

    async scalar(sql: string, args: Array<any> = []): Promise<number> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    let row = results[0]
                    let value = row[Object.keys(row)[0]]
                    if (value) {
                        resolve(parseFloat(value))
                    } else {
                        resolve(0)
                    }
                }
            })
        })
    }
}
export default DbHelper