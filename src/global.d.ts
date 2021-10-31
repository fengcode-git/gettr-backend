declare interface ITokenUser {
    id: string,
    name: string,
    avatar: string
}
declare namespace Express {
    interface Request {
        user?: ITokenUser
    }
}