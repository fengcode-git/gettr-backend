import Post from "../entity/Post"
import PostView from "../entity/PostView"
import PostType from "../enums/PostType"
import UnitOfWork from "./UnitOfWork"

export default class PostService {
    static async add(content: string, personId: string, pType: PostType = PostType.post, refId: string = '', images: string = ''): Promise<PostView> {
        let work = new UnitOfWork()
        work.db.open()
        let post = await work.post.insert(content, personId, pType, refId, images)
        let postView = await work.post.getViewById(post.id)
        work.db.close()
        return postView!
    }

    static async getPosts(currentPage: number, personId: string='') {
        let work = new UnitOfWork()
        work.db.open()
        let result = null;
        if (personId) {
            result = await work.post.getPostWithFollower(currentPage, personId)
        } else {
            result = await work.post.getPosts(currentPage)
        }
        work.db.close()
        return result
    }

    static async delete(id: string) {
        let work = new UnitOfWork()
        work.db.open()
        await work.post.delete(id)
        work.db.close()
    }
}