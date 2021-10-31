import winston from "winston";

interface ILogger {
    debug(msg: string): void,
    warn(msg: string): void,
    error(msg: string): void,
    info(msg: string): void
}

const logger: ILogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize({
                    all: true
                })
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/app.log',
            maxsize: 5242880, // 5MB
            handleExceptions: true,
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-dd HH:mm:ss'
        }),
        winston.format.printf(info => `[${info.timestamp}] [${info.level}]:  ${info.message}`)
    )
})

export default logger