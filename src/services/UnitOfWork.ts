import DbHelper from "../db/DbHelper";
import PersonRepository from "./PersonRepository";
import PostRepository from "./PostRepository";

export default class UnitOfWork {
    readonly db: DbHelper
    readonly person: PersonRepository
    readonly post: PostRepository
    
    constructor() {
        this.db = DbHelper.create()
        this.person = new PersonRepository(this.db)
        this.post = new PostRepository(this.db)
    }
}